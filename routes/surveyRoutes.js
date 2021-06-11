const Survey = require("../models/Survey")
const router = require("express").Router()
const requireLogin = require("../middlewares/requireLogin")
const requireCredits = require("../middlewares/requireCredits")
const Mailer = require("../services/Mailer")
const surveyTemplate = require("../services/emailTemplates/surveyTemplate")
const { Path } = require("path-parser")
const _ = require("lodash")
const { URL } = require("url")
const mongoose = require("mongoose")
const Survey = require("../models/Survey")

router.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body
    const survey = new Survey({
        title,
        body,
        subject,
        recipients: recipients
            .split(",")
            .map((email) => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
    })
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
        await mailer.send()
        await survey.save()
        req.user.credits -= 1
        const user = await req.user.save()
        res.send(user)
    } catch (err) {
        res.status(422).send(err)
    }
})

router.get("/api/surveys/thanks", (req, res) => {
    res.send("thanks for answer")
})

router.post("/api/surveys/webhooks", (req, res) => {
    const events = _.map(req.body, ({email}) => {
        const pathname = new URL(event.url).pathname
        const p = new Path("/api/surveys/:surveyId/:choice")
        const match = p.test(pathname)
        if(match){
            return {surveyId:match.surveyId, choice:match.choice, email }
        }
    })
    console.log(req.body)
    res.send({})
})

module.exports = router

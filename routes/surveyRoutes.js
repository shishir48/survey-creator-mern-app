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

router.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
        recipients: false,
    })
    res.send(surveys)
})

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

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("thanks for answer")
})

router.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice")
    const events = _.chain(req.body)
        .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname)
            if (match) {
                return { surveyId: match.surveyId, choice: match.choice, email }
            }
        })
        .compact()
        .uniqBy("email", "surveyId")
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false },
                    },
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { "recipients.$.responded": true },
                    lastResponded: new Date(),
                }
            ).exec()
        })
        .value()

    res.send({})
})

module.exports = router

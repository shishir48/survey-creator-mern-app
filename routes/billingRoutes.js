const User = require('../models/User')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')


router.post('/api/stripe',requireLogin, async (req,res) => {
    
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'inr',
        description: '5 rupees for 5 credits',
        source: req.body.token.id
    })
    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
})


module.exports = router
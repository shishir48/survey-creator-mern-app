const User = require('../models/User')
const express = require('express')
const router = express.Router()
const passport = require('passport')

// router.get('/',(req,res) => {
//     res.send({"hi":"there"})
// })

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/auth/google/callback',passport.authenticate('google',{ failureRedirect: '/auth/google' }),(req,res) => {
  res.redirect('/')
})

router.get('/api/logout',(req,res) => {
  req.logOut() 
  res.redirect('/')
})

router.get('/api/current_user',(req,res) => {
  res.send(req.user)
})

module.exports = router
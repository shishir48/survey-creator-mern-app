const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')
const keys = require('../config/keys')

passport.serializeUser((user,done) => {
  done(null,user.id)
})

passport.deserializeUser((id,done) => {
  User.findById(id).then((user) => {
    done(null,user)
  })
})

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret ,
  callbackURL: '/auth/google/callback',
  proxy: true  
},(accessToken,refreshToken,profile,done) => {
  User.findOne({googleId:profile.id}).then((user) => {
    if(user){
      done(null,user)
    }
    else{
      const newUser = new User({googleId:profile.id})
      newUser.save().then((user) => done(null,user))
    }
  })
}))

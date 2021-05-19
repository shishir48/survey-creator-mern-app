const express = require("express")
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoutes')
require('./services/passport')
const cookieSession = require('cookie-session')
const passport = require('passport') 
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const billingRoutes = require('./routes/billingRoutes')

mongoose.connect(keys.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

app.use(bodyParser.json())
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys:["secret"]
}))
app.use(passport.initialize())
app.use(passport.session())



app.use(authRouter)
app.use(billingRoutes)

if(process.env.NODE_ENV === 'production' ){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
const port = process.env.PORT || 5000
app.listen(port)
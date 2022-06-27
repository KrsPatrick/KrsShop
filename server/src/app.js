const express = require('express')

const registrationRouter = require('./routes/auth/auth.router')
const userRouter = require('./routes/user/user.router')

const app = express()

app.use(express.json())
app.use('/test', userRouter)
app.use('/user', registrationRouter)

module.exports = app
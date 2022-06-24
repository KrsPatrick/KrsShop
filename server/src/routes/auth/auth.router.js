const express = require('express')

const { httpCreateNewUser, loginUser } = require('./auth.controller')

const registrationRouter = express.Router()

registrationRouter.post('/', httpCreateNewUser)
registrationRouter.post('/login', loginUser)

module.exports = registrationRouter
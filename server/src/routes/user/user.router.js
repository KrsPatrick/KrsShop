const express = require('express')

const { getUser, createUser } = require('./user.controller')

const userRouter = express.Router()

userRouter.get('/', getUser)
userRouter.post('/', createUser)

module.exports = userRouter
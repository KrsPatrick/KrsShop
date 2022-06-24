const express = require('express')

const { getUser, createUser } = require('./user.controller')

const userRouter = express.Router()

userRouter.put('/:id', getUser)


module.exports = userRouter
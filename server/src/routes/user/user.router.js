const express = require('express')
const { verifyToken, verifyAuth } = require('../verifyToken')

const { createUser, updateUser, deleteUser } = require('./user.controller')

const userRouter = express.Router()

userRouter.put('/:id', verifyAuth, updateUser)
userRouter.delete('/:id', verifyAuth, deleteUser)


module.exports = userRouter
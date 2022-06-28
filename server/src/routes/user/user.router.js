const express = require('express')
const { verifyToken, verifyAuth } = require('../verifyToken')

const { updateUser, deleteUser, getUser, getAllUser, getUserStats } = require('./user.controller')

const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.get('/stats', getUserStats)
userRouter.put('/:id', verifyAuth, updateUser)
userRouter.delete('/:id', verifyAuth, deleteUser)
userRouter.get('/:id', getUser)



module.exports = userRouter
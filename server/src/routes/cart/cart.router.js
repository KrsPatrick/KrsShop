const express = require('express')
const { verifyIfAdmin } = require('../verifyToken')
const { createCart, updateCart, deleteCart, getUserCart, getAll } = require('./cart.controller')

const cartRouter = express.Router()

cartRouter.get('/', verifyIfAdmin, getAll)
cartRouter.post('/', createCart)
cartRouter.put('/:id', updateCart)
cartRouter.delete('/:id', deleteCart)
cartRouter.get('/:id', getUserCart)

module.exports = cartRouter
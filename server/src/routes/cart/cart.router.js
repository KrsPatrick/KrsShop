const express = require('express')
const { createCart, updateCart, deleteCart, getUserCart, getAll } = require('./cart.controller')

const cartRouter = express.Router()

cartRouter.get('/', getAll)
cartRouter.post('/', createCart)
cartRouter.put('/:id', updateCart)
cartRouter.delete('/:id', deleteCart)
cartRouter.get('/:id', getUserCart)

module.exports = cartRouter
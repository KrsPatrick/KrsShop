const express = require('express')
const { verifyIfAdmin } = require('../verifyToken')
const { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders, getMonthlyIncome } = require('./order.controller')

const orderRouter = express.Router()

orderRouter.get('/', verifyIfAdmin, getAllOrders)
orderRouter.post('/', createOrder)
orderRouter.get('/income', verifyIfAdmin, getMonthlyIncome)
orderRouter.put('/:id', updateOrder)
orderRouter.delete('/id', deleteOrder)
orderRouter.get('/userId', getUserOrder)


module.exports = orderRouter
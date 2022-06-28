const express = require('express')
const { verifyIfAdmin } = require('../verifyToken')
const { createProduct, updateProduct, getAllProducts, deleteProduct, getProduct } = require('./product.controller')

const productRouter = express.Router()

productRouter.get('/', getAllProducts)
productRouter.post('/', verifyIfAdmin, createProduct)
productRouter.get('/:id', getProduct)
productRouter.delete('/:id', deleteProduct)
productRouter.put('/:id', verifyIfAdmin, updateProduct)

module.exports = productRouter
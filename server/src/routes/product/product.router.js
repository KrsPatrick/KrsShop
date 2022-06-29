const express = require('express')
const { verifyIfAdmin } = require('../verifyToken')
const { createProduct, updateProduct, getAllProducts, deleteProduct, getProduct } = require('./product.controller')

const productRouter = express.Router()

productRouter.get('/', getAllProducts)
productRouter.post('/', verifyIfAdmin, createProduct)
productRouter.get('/:id', verifyIfAdmin, getProduct)
productRouter.delete('/:id', verifyIfAdmin, deleteProduct)
productRouter.put('/:id', verifyIfAdmin, updateProduct)

module.exports = productRouter
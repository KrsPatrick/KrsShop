const express = require('express')

const registrationRouter = require('./routes/auth/auth.router')
const cartRouter = require('./routes/cart/cart.router')
const productRouter = require('./routes/product/product.router')
const userRouter = require('./routes/user/user.router')

const app = express()

app.use(express.json())
app.use('/test', userRouter)
app.use('/user', registrationRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

module.exports = app
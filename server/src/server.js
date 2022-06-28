const http = require('http')
const mongoose = require('mongoose')
const { userInfo } = require('os')
require('dotenv').config()

const app = require('./app')

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log("db is open!");
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function serverStart(){
    await mongoose.connect(MONGO_URL)

    // mongoose.connection.db.dropCollection('users')

    server.listen(PORT, () => {
    console.log(`server is listen on port: ${PORT}`)

    
})
}

serverStart()


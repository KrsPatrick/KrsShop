const http = require('http')
const { userInfo } = require('os')
require('dotenv').config()

const app = require('./app')
const { mongoConnect } = require('./services/mongo')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

async function serverStart(){
    await mongoConnect()

    // mongoose.connection.db.dropCollection('users')

    server.listen(PORT, () => {
    console.log(`server is listen on port: ${PORT}`)

    
})
}

serverStart()


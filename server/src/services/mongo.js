const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://krspatrick:TqUTdCD5cWuvAWSw@krsshop.glqdvoa.mongodb.net/?retryWrites=true&w=majority" // process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log("db is open!");
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

module.exports = {
    mongoConnect,
}
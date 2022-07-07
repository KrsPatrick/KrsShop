const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')
const {mongoConnect} = require('../../services/mongo')
require('dotenv').config()

describe('Testing API', () => {
    beforeAll( async () => {
        await mongoConnect();
    })

    afterAll( async () => {
        mongoose.connection.close()
    })

    describe(' test POST /user', () => {
        test(' it should respond with 400 success', async () => {
            const response = await request(app)
            .post('/user')
            .send({
                username: "Mike1",
                email: "mikey@gmadqdd.de",
            })
            .expect(400)
        })

        test(' it should respond with 200 success', async () => {
            const response = await request(app)
            .post('/user')
            .send({
                username: "Patty",
                email: "paddy@gmx.de",
                password: "12345"
            })
            .expect(200)
        })
    })
})
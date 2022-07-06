const { default: mongoose } = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { mongoConnect } = require('../../services/mongo')

describe('Testing API', () => {

    beforeAll( async () => {
        await mongoConnect();
    })

    afterAll( async () => {
        mongoose.connection.close()
    })

    describe('Test GET /product', () => {
        test(' It should respond with 200 success', async () => {
            const response = await request(app)
            .get('/product')
            .expect('Content-Type', /json/)
            .expect(200)
            // expect(response.statusCode).toBe(200);
        })
    })
    
});


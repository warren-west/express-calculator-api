// requirements / imports / dependencies
require('dotenv').config()
const express = require('express')
const request = require('supertest')
const jsend = require('jsend')

// set up the app
const app = express()

// import route
const previousRouter = require('../routes/previous')
const authRouter = require('../routes/auth')

// use middlewares
app.use(express.json())
app.use(jsend.middleware)

// attach the route to the app
app.use('/previous', previousRouter)
app.use('/login', authRouter)

// define a test group "describe"
describe("Previous tests - add, subtract, multiply, divide with tokens", () => {
    let token = "eyskuyavsdkayrfalerug"

    // async function getToken() {
    //     const { body: { data: { token } } } = request(app).get(`/login`).send({ email: "", password: "" })
    //     return token
    // }

    // negative test - previous/add with no token
    test("previous/add with no token", async () => {
        // Arrange
        const number = 1
        const expectedStatusCode = 401
        const expectedBody = {
            data: {
                message: "Unauthorized"
            },
            status: "fail"
        }

        // Act
        const { body, statusCode } = await request(app).get(`/previous/add/${number}`).set("Authorization", `Bearer ${token}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toEqual(expectedBody)
    })

    // token = getToken()

    // "Happy day" scenarios
    test("Get a valid token", async () => {
        const email = "tor@noroff.com"
        const password = "3456"

        // login to get a token:
        const { body: { data } } = await request(app)
            .post('/login')
            .send({ email, password })
        token = data.token

        console.log(token)
    })

    test("GET /previous/add/:number", async () => {
        // Arrange
        const number = 5
        const expectedStatusCode = 200

        // Act
        // we need a token to add to the header of this request
        const { body, statusCode } = await request(app)
            .get(`/previous/add/${number}`)
            .set("Authorization", `Bearer ${token}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toHaveProperty("status", "success")
        expect(body).toHaveProperty("data.result")
    })

    test("GET /previous/subtract/:number", async () => {
        // Arrange
        const number = 5
        const expectedStatusCode = 200

        // Act
        // we need a token to add to the header of this request
        const { body, statusCode } = await request(app)
            .get(`/previous/add/${number}`)
            .set("Authorization", `Bearer ${token}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toHaveProperty("status", "success")
        expect(body).toHaveProperty("data.result")
    })
})
// Write tests
require('dotenv').config()
const express = require('express')
const request = require('supertest')
const jsend = require('jsend')

const app = express()

// routes
const addRoutes = require("../routes/add")
const subtractRoutes = require("../routes/subtract")
const multiplyRoutes = require("../routes/multiply")
const divideRoutes = require("../routes/divide")

// middlewares
app.use(express.json())
app.use(jsend.middleware)

// add routes to app
app.use("/add", addRoutes)
app.use("/subtract", subtractRoutes)
app.use("/multiply", multiplyRoutes)
app.use("/divide", divideRoutes)

describe("Add tests", () => {
    // "Happy day" / Positive scenarios
    test("GET /add/:number1/:number2 - success", async () => {
        // AAA Standard
        // Arrange
        const number1 = 2
        const number2 = 3
        const expectedStatusCode = 200
        const expectedBody = {
            status: "success",
            data: 5
        }

        // Act
        const { body, statusCode } = await request(app).get(`/add/${number1}/${number2}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toEqual(expectedBody)
    })

    // Negative scenarios
    test("GET /add/:number1/:number2 - error - number1 invalid", () => {
        expect(true).toBe(true)
    })
})

describe("Subtract tests", () => {
    test("", () => {
        expect(true).toBe(true)
    })
    
})

describe("Multiply tests", () => {
    test("", () => {
        expect(true).toBe(true)
    })

})

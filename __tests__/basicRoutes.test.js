//dependencies
require('dotenv').config()
const express = require('express')
const request = require('supertest')
const jsend = require('jsend')

// create the app (only as much of the app as we need to run the tests here)
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

// start testing
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

    // test that floating point / decimal input parameters are converted to integer
    test("GET /add/:number1/:number2 - success", async () => {
        // AAA Standard
        // Arrange
        const number1 = 2.6 // the decimal is dropped because of parseInt()
        const number2 = 3.6 // the decimal is dropped because of parseInt()
        const expectedStatusCode = 200
        const expectedBody = {
            status: "success",
            data: 5 // we would expect 5
        }

        // Act
        const { body, statusCode } = await request(app).get(`/add/${number1}/${number2}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toEqual(expectedBody)
    })

    // Negative scenarios
    test("GET /add/:number1/:number2 - error - number1 invalid", async () => {
        // Arrange
        const number1 = "abc"
        const number2 = 3
        const expectedStatusCode = 400
        const expectedBody = {
            data: {
                message: "Number 1 is not in the correct format",
            },
            status: "fail",
        }

        // Act
        const { body, statusCode } = await request(app).get(`/add/${number1}/${number2}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toHaveProperty("data.message", "Number 1 is not in the correct format")
        expect(body).toHaveProperty("status", "fail")
        expect(body).toEqual(expectedBody)
    })
})

describe("Subtract tests", () => {
    // copy + paste from add
    test("", () => {
        expect(true).toBe(true)
    })
    
})

describe("Multiply tests", () => {
    // copy + paste from add
    test("", () => {
        expect(true).toBe(true)
    })

})

describe("Division tests", () => {
    // "Happy day" scenario
    test("GET /divide/:number1/:number2 - success - not rounded", async () => {
        // Arrange
        const number1 = 6
        const number2 = 2
        const expectedStatusCode = 200
        const expectedBody = {
            data: {
                message: "Result has not been rounded.",
                result: 3
            },
            status: "success"
        }

        // Act
        const { body, statusCode} = await request(app).get(`/divide/${number1}/${number2}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toEqual(expectedBody)
        expect(body).toHaveProperty("status")
        expect(body).toHaveProperty("data.result")
        expect(body).toHaveProperty("data.message")
    })

    test("GET /divide/:number1/:number2 - success - rounded", async () => {
        // Arrange
        const number1 = 5
        const number2 = 2
        const expectedStatusCode = 200
        const expectedBody = {
            data: {
                message: "Result has been rounded.",
                result: 3
            },
            status: "success"
        }

        // Act
        const { body, statusCode} = await request(app).get(`/divide/${number1}/${number2}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toEqual(expectedBody)
        expect(body).toHaveProperty("status")
        expect(body).toHaveProperty("data.message")
        expect(body).toHaveProperty("data.result")
    })

    // negatives (e.g. div by 0, num1 invalid, num2 invalid)
    test("GET /divide/:number1/:number2 - fail - dividing by 0", async () => {
        // Arrange
        const number1 = 5
        const number2 = 0
        const expectedStatusCode = 400
        // const expectedBody = {
        //     data: {
        //         message: "Result has been rounded.",
        //         result: 3
        //     },
        //     status: "success"
        // }

        // Act
        const { body, statusCode} = await request(app).get(`/divide/${number1}/${number2}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        // expect(body).toEqual(expectedBody)
        expect(body).toHaveProperty("status", "fail")
        expect(body).toHaveProperty("data.message", "Number 2 cannot be 0")
    })
})

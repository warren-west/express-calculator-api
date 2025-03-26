const router = require('express').Router()
const jwt = require('jsonwebtoken')
const ResultService = require('../services/ResultService')
const db = require('../models')
const resultService = new ResultService(db)

// GET /divide
router.get('/:num1/:num2', async (req, res) => {
    try {
        const num1 = parseInt(Number(req.params.num1)) //"five" -> NaN

        if (isNaN(num1))
            return res.status(400).jsend.fail({ message: "Number 1 is not in the correct format" })

        const num2 = parseInt(Number(req.params.num2)) //"five" -> NaN

        if (isNaN(num2))
            return res.status(400).jsend.fail({ message: "Number 2 is not in the correct format" })

        if (num2 === 0)
            return res.status(400).jsend.fail({ message: "Number 2 cannot be 0" })

        const result = num1 / num2

        const token = req.headers.authorization?.split(' ')[1] || null

        // if there is a token, save the rounded result to the DB
        if (token) {
            // verify and decode token
            const parsedToken = jwt.verify(token, process.env.JWT_SECRET)

            // use the token to create a new Result in the DB with the User id
            await resultService.createResult("add", Math.round(result), parsedToken.id)
        }

        // Once the result has possibly been saved, deal with returning a response to the client
        if (!Number.isInteger(result))
            return res.status(200).jsend.success({ result: Math.round(result), message: "Result has been rounded." })

        // implies that the result was an integer, and can be returned as is
        return res.status(200).jsend.success({ result, message: "Result has not been rounded." })
    } catch (err) {
        // catch invalid token error
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).jsend.fail({ message: "Invalid token" })
        }

        return res.status(500).jsend.error(err.message)
    }
})


module.exports = router
const router = require('express').Router()
const jwt = require('jsonwebtoken')

// GET /subtract
router.get('/:num1/:num2', async (req, res) => {
    try {
        const num1 = parseInt(Number(req.params.num1)) //"five" -> NaN

        if (isNaN(num1))
            return res.status(400).jsend.fail({ message: "Number 1 is not in the correct format" })

        const num2 = parseInt(Number(req.params.num2)) //"five" -> NaN

        if (isNaN(num2))
            return res.status(400).jsend.fail({ message: "Number 2 is not in the correct format" })

        const result = num1 - num2

        const token = req.headers.authorization?.split(' ')[1] || null

        if (!token) {
            // no token attached to request
            return res.status(200).jsend.success(result)

        } else {
            // verify and decode token
            const parsedToken = jwt.verify(token, process.env.JWT_SECRET)

            // use the token to create a new Result in the DB with the User id
            const dbResult = await resultService.createResult("subtract", result, parsedToken.id)

            // return the result
            res.status(201).jsend.success({ dbResult })
        }
    } catch (err) {
        // catch invalid token error
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).jsend.fail({ message: "Invalid token" })
        }

        return res.status(500).jsend.error("Internal server error")
    }
})


module.exports = router
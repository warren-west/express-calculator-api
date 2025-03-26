const router = require('express').Router()
const { hasValidToken } = require('../middleware/jwtMiddleware')
const db = require('../models')
const ResultService = require('../services/ResultService')
const resultService = new ResultService(db)

// GET /previous/add
router.get('/add/:number', hasValidToken, async (req, res) => {
    try {
        // retrieve the number rom the query params
        const number = parseInt(Number(req.params.number))
        
        // some validation
        if (isNaN(number)) {
            return res.status(400).jsend.fail({ message: "Number is not valid" })
        }
        
        let previous = await resultService.getResultByUserId(req.parsedToken.id)

        // check if previous has a value
        if (!previous)
            return res.status(404).jsend.fail({ message: "No previous value exists for the current user" })

        previous = JSON.parse(JSON.stringify(previous))

        // calculate new result
        const result = previous.Value + number

        // new result should overwrite old result in the DB
        await resultService.createResult("add", result, req.parsedToken.id)

        return res.status(200).jsend.success({ result })

    } catch (err) {
        return res.status(500).jsend.error("Server error")
    }
})

// GET /previous/subtract

// GET /previous/multiply

// GET /previous/divide


module.exports = router
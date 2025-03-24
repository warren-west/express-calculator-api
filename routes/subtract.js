const router = require('express').Router()

// GET /subtract
router.get('/:num1/:num2', (req, res) => {
    try {
        const num1 = parseInt(Number(req.params.num1)) //"five" -> NaN
    
        if (isNaN(num1))
            return res.status(400).jsend.fail({ message: "Number 1 is not in the correct format" })
    
        const num2 = parseInt(Number(req.params.num2)) //"five" -> NaN
    
        if (isNaN(num2))
            return res.status(400).jsend.fail({ message: "Number 2 is not in the correct format" })
    
        const result = num1 - num2
    
        return res.status(200).jsend.success(result)
    } catch (err) {
        return res.status(500).jsend.error("Internal server error")
    }
})


module.exports = router
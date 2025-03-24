const router = require('express').Router()

// GET /divide
router.get('/:num1/:num2', (req, res) => {
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
        console.log(result)
    
        if (!Number.isInteger(result))
            return res.status(200).jsend.success({ result: Math.round(result), message: "Result has been rounded." })
        
        // implies that the result was an integer, and can be returned as is
        return res.status(200).jsend.success({ result, message: "Result has not been rounded." })
    } catch (err) {
        return res.status(500).jsend.error("Internal server error")
    }
})


module.exports = router
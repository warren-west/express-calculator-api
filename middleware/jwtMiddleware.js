require('dotenv').config()
const jwt = require('jsonwebtoken')

function hasValidToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
    
        const parsedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.parsedToken = parsedToken

        next()

    } catch (err) {
        return res.status(401).jsend.fail({ message: "Unauthorized" })
    }
}

function isAdmin() {
    // not implemented in this example
}

// revealing module pattern
const jwtMiddleware = {
    hasValidToken,
    // isAdmin
}

module.exports = jwtMiddleware
const router = require('express').Router()
const db = require('../models')
const UserService = require('../services/UserService')
const userService = new UserService(db)
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


// POST /login
router.post('/', async (req, res) => {
    // destructure things we need from the request body
    const { email, password } = req.body

    // fetch a single user from the DB, using the email
    userService.getUserByEmail(email).then((data) => {
        // check if user with this email exists
        if (data === null) {
            return res.status(401).jsend.fail({ "result": "Incorrect email or password" })
        }

        crypto.pbkdf2(password, data.Salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            // if the password decryption fails (error with our crypto logic)
            if (err) { return next(err) }

            // does the password from the request body match the decrypted password from the DB?
            if (!crypto.timingSafeEqual(data.EncryptedPassword, hashedPassword)) {
                return res.status(401).jsend.fail({ "result": "Incorrect email or password" })
            }

            // Create a payload object to attach to the token
            const payload = JSON.parse(JSON.stringify(data))
            delete payload.EncryptedPassword
            delete payload.Salt

            // Create a token  to attach to the response (for dev purposes)
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60s" })

            // User is successfully logged in
            res.jsend.success({ result: "You are logged in", token, payload })
        })
    })
})


// POST /login/signup
router.post('/signup', async (req, res, next) => {
    // destructure required values from the request body
    const { name, email, password } = req.body

    // Generate a salt for hashing the password
    const salt = crypto.randomBytes(16)
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
        if (err) { return next(err) }

        // Create a new user
        const result = await userService.create(name, email, hashedPassword, salt)

        // Create a payload object to attach to the token
        const payload = JSON.parse(JSON.stringify(result))
        delete payload.EncryptedPassword
        delete payload.Salt

        // Create a token  to attach to the response (for dev purposes)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60s" })

        res.status(201).jsend.success({ result: "You created an account.", token, payload })
    })
})

module.exports = router
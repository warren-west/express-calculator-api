const router = require('express').Router()

router.get('/', (req, res) => {
    return res.status(200).jsend.success({ message: "Index endpoint hit successfully" })
})

module.exports = router
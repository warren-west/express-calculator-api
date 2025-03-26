require('dotenv').config()
const express = require('express')

const db = require("./models")
db.sequelize.sync({ force: false })

const app = express()
const jsend = require('jsend')

// using middlewares
app.use(express.json()) // grabbing json data from a req body
app.use(jsend.middleware)

// import routes
const indexRouter = require('./routes/index')
const addRouter = require('./routes/add')
const subtractRouter = require('./routes/subtract')
const multiplyRouter = require('./routes/multiply')
const divideRouter = require('./routes/divide')
const previousRouter = require('./routes/previous')
const authRouter = require('./routes/auth')

// adding the routes to app
app.use('/', indexRouter)
app.use('/add', addRouter)
app.use('/subtract', subtractRouter)
app.use('/multiply', multiplyRouter)
app.use('/divide', divideRouter)
app.use('/previous', previousRouter)
app.use('/login', authRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App is listening on port ${port}`))
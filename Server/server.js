const express = require('express')
const dotenv = require('dotenv')
const app = express()
const passport = require('passport')
const cors = require('cors')

dotenv.config()
require('./db')
const PORT = process.env.PORT || 1234
app.use(express.json())
require('./passport')
app.use(passport.initialize())
app.use(cors())
app.use(function(_, res, next){
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, PUT, PATCH, OPTIONS ,DELETE')
    res.setHeader('Access-Control-Allow-Headers' , 'X-Requested-With, content-type, Authorization, XMLHttpRequest')
    res.setHeader('Access-Control-Allow-Credentials' , 'true')
    next()
})

app.get('/', (_, res)=>{
    res.status(200).json({statusCode: 200, message: 'Welcome to the student dashboard'})
})

app.use(require('./routers/apiRouter/studentApiRouter'))
app.use(require('./routers/normalRoues/studentNormalRoutes'))

app.listen(PORT, ()=>{
    console.log('Server started successfully')
})
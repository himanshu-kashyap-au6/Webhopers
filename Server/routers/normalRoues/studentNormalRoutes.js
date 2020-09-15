const passport = require('passport')
const express = require('express')
const router = express.Router()
const { getStudentProfile } = require('../../controllers/normalController/studentNormalController')

router.get('/student/profile', passport.authenticate('jwt' , {session: false}) , getStudentProfile)

module.exports = router
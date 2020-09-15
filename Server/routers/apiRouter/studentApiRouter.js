const passport = require('passport')
const express = require('express')
const router = express.Router()
const { registerStudent, studentLogin, studentUpdate, studentLogOut } = require('../../controllers/apiControllers/studentApiController')
const upload = require('../../multer')

router.post('/student/register', upload.single('image'), registerStudent)
router.post('/student/login', passport.authenticate('local', {session: false}) , studentLogin)
router.patch('/student/updateProfile/:studentId', passport.authenticate('jwt' , {session: false}), upload.single('image'), studentUpdate )
router.delete('/student/logOut', passport.authenticate('jwt' , {session: false}), studentLogOut )
module.exports = router
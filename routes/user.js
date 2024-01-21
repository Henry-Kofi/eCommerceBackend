const express = require('express');
const router = express.Router()
const {verifyUser} = require('../Middleware/middleware')

const {
    Signup,login,getUser,update
} = require('../controller/user')

router.post('/signup',Signup);

router.post('/login',login);
router.put('/update/:id',update)
// router.post('/',userVerification);
router.route('/me').get([verifyUser],getUser)

module.exports = router
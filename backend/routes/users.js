'use strict';

var express = require('express');
var router = express.Router();

const user = require('./../controllers/userControllers');
const verify = require('./../middleware/verify');

/* GET users listing. */
// router.get('/', user.users);
router.post('/register', user.createUsers);
router.post('/login', user.loginUser);
router.post('/getuser',verify.verifyToken, user.getUser);
router.post('/sendrequestforget', user.sendRequestForget);
router.post('/changepassword', user.changePassword);

module.exports = router;
'use strict';

var express = require('express');
var router = express.Router();

const todo = require('./../controllers/userControllers');
const verify = require('./../middleware/verify');

/* GET users listing. */
// router.get('/', todo.users);
router.post('/register', todo.createUsers);
router.post('/login', todo.loginUser);
router.post('/getuser',verify.verifyToken, todo.getUser);

module.exports = router;
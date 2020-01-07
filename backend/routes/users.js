'use strict';

var express = require('express');
var router = express.Router();

const todo = require('./../controllers/userControllers');

/* GET users listing. */
router.get('/', todo.users);
router.post('/register', todo.createUsers);
router.post('/login', todo.loginUser);

module.exports = router;
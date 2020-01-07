'use strict';

var express = require('express');
var router = express.Router();

var todo = require('./../controllers/userControllers');

/* GET users listing. */
router.get('/', todo.users);

module.exports = router;
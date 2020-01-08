'use strict';

var express = require('express');
var router = express.Router();

const type = require('./../controllers/typeController');
const category = require('./../controllers/categoryController')
const journal = require('./../controllers/journalControllers')
const verify = require('./../middleware/verify');

/* GET users listing. */
router.get('/type',verify.verifyToken, type.getTypes);
router.post('/type', verify.verifyToken, type.createTypes);
router.put('/type', verify.verifyToken, type.updateTypes);
router.delete('/type', verify.verifyToken, type.deleteTypes);

router.get('/category',verify.verifyToken, category.getCategory);
router.post('/category', verify.verifyToken, category.createCategories);
router.put('/category', verify.verifyToken, category.updateCategories);
router.delete('/category', verify.verifyToken, category.deleteCategories);

router.get('/',verify.verifyToken, journal.getJournals );
// router.post('/', verify.verifyToken, journal.createJournals);
router.post('/', verify.verifyToken, journal.createJournals);
// router.put('/category', verify.verifyToken, category.updateCategories);
// router.delete('/category', verify.verifyToken, category.deleteCategories);

// router.post('/register', todo.createUsers);
// router.post('/login', todo.loginUser);
// router.post('/getuser',verify.verifyToken, todo.getUser);
// router.post('/sendrequestforget', todo.sendRequestForget);
// router.post('/changepassword', todo.changePassword);

module.exports = router;
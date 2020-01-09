'use strict';

var express = require('express');
var router = express.Router();

//for upload
var uploadcek = require('./../config/upload')
var upload = uploadcek.destination('public/nota')

const type = require('./../controllers/typeController');
const category = require('./../controllers/categoryController')
const journal = require('./../controllers/journalControllers')
const verify = require('./../middleware/verify');

/* GET users listing. */
router.get('/type', upload.none(), verify.verifyToken, type.getTypes);
router.post('/type', upload.none(), verify.verifyToken, type.createTypes);
router.put('/type', upload.none(), verify.verifyToken, type.updateTypes);
router.delete('/type', upload.none(), verify.verifyToken, type.deleteTypes);

router.get('/category', upload.none(), verify.verifyToken, category.getCategory);
router.post('/category', upload.none(), verify.verifyToken, category.createCategories);
router.put('/category', upload.none(), verify.verifyToken, category.updateCategories);
router.delete('/category', upload.none(), verify.verifyToken, category.deleteCategories);

router.get('/', upload.none(), verify.verifyToken, journal.getJournals );
// router.post('/', verify.verifyToken, journal.createJournals);
router.post('/', upload.fields([{ name: 'nota', maxCount: 1 },]), verify.verifyToken, journal.createJournals);
// router.put('/category', verify.verifyToken, category.updateCategories);
// router.delete('/category', verify.verifyToken, category.deleteCategories);

// router.post('/register', todo.createUsers);
// router.post('/login', todo.loginUser);
// router.post('/getuser',verify.verifyToken, todo.getUser);
// router.post('/sendrequestforget', todo.sendRequestForget);
// router.post('/changepassword', todo.changePassword);

module.exports = router;
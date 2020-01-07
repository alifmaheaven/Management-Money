'use strict';

require('dotenv').config()

var response = require('./../response/res');
var connection = require('./../databases/conn');

var SCREET_KEY = process.env.SCREET_KEY
var EXPIRED_TOKEN = process.env.EXPIRED_TOKEN

// agar sepuluh baris maka kita gunakan salt dan pake async ya :)
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

exports.getUser = async function(req, res) {
    jwt.verify(req.token, SCREET_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            response.ok(authData, res)
        }
    } )
};

exports.createUsers = async function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    
    var salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(password, salt)

    connection.query('INSERT INTO users (name, username, email, password) values (?,?,?,?)',
    [ name, username, email, password ], 
    function (err, result){
        if(err){
            console.log(err)
            response.bad("gagal menambahkan user!", res)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.loginUser = async function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var isMatch
    var userData = {}

    connection.query('SELECT * FROM users WHERE username = ?',
    [username,],
    async function (err, result){
        if(err){
            console.log(err)
            response.bad("Error Database", res)
        } else{
            if (result.length > 0) {
                userData = result[0]
                isMatch = await bcrypt.compare( password, userData.password);
                if (isMatch) {
                    jwt.sign({userData}, SCREET_KEY,{expiresIn: 60 * EXPIRED_TOKEN},(err, token) => {
                        userData.token = token
                        userData.expiresIn = 60 * EXPIRED_TOKEN
                        response.ok(userData, res)
                   })
                   return
                }
                response.bad('Username and Password not match', res)
                return
            }
            response.bad('Username not registered', res)
            return
        }
    });
};

'use strict';

require('dotenv').config()

var response = require('./../response/res');
var connection = require('./../databases/conn');

var mailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var emailTranport =  mailConfig.EmailTransport

var SCREET_KEY = process.env.SCREET_KEY
var EXPIRED_TOKEN = process.env.EXPIRED_TOKEN * 60

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

    connection.query('SELECT * FROM users WHERE username = ? OR email = ? ',
    [username,username],
    async function (err, result){
        if(err){
            console.log(err)
            response.bad("Error Database", res)
        } else{
            if (result.length > 0) {
                userData = result[0]
                isMatch = await bcrypt.compare( password, userData.password);
                if (isMatch) {
                    jwt.sign({userData}, SCREET_KEY,{expiresIn: EXPIRED_TOKEN},(err, token) => {
                        userData.token = token
                        // userData.expiresIn = 60 * EXPIRED_TOKEN
                        console.log(EXPIRED_TOKEN);
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

exports.sendRequestForget = async function(req, res) {
    var email = req.body.email;
    var url = req.body.url
    var userData = {}
    if (email === null || email === undefined) {
        response.bad("Please insert email!", res)
        return
    }

    if (url === null || url === undefined) {
        response.bad("Please insert url for fogot password!", res)
        return
    }

    connection.query('SELECT * FROM users WHERE email = ?',
    [email,],
    async function (err, result){
        if(err){
            console.log(err)
            response.bad("Error Database", res)
            return
        } else{
            if (result.length > 0) {
                userData = result[0]
                    jwt.sign({userData}, SCREET_KEY,{expiresIn: EXPIRED_TOKEN},(err, token) => {
                        userData.token = token
                        mailConfig.ViewOption(emailTranport, hbs)
                        let HelperOptions = {
                            from: '"Tariqul islam" <tariqul.islam.rony@gmail.com>',
                            to: ''+email+'',
                            subject: 'Change Password',
                            template: 'email',
                            context: {
                              name:"tariqul_islam",
                              email: ''+email+'',
                              address: "52, Kadamtola Shubag dhaka",
                              token : ''+token+'',
                              url : ''+url+''
                            }
                          };

                          emailTranport.sendMail(HelperOptions, (error,info) => {
                            if(error) {
                              console.log(error);
                              response.bad("Email not Send", res)
                              return
                            }
                            console.log(info);
                            response.ok('Email Send', res)
                            return
                          });
                   })
                   
            } else {
                response.bad('Email not registered', res)
                return
            }

        }
    });
};

exports.changePassword = async function(req, res) {
    var token = req.body.token;
    var newpassword = req.body.newpassword;
    var id

    var salt = await bcrypt.genSalt(10);
    newpassword = await bcrypt.hash(newpassword, salt)

    jwt.verify(token, SCREET_KEY, (err, authData) => {
        if (err) {
            console.log(err);
            response.bad('Token Expired',res);
            return
        }
        id = authData.userData.id
        return id
    } )

    connection.query('UPDATE users SET password = ? WHERE id = ?',
    [newpassword,id],
    async function (err, result){
        if(err){
            console.log(err)
            response.bad("Error Database", res)
        } else{
            response.ok(result, res)
            return
        }
    });
};

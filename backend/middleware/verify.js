'use strict';

require('dotenv').config()

var response = require('./../response/res');
var connection = require('./../databases/conn');

var SCREET_KEY = process.env.SCREET_KEY

const jwt = require('jsonwebtoken')

exports.verifyToken = async function(req, res, next) {
    // Get header value
    const bearerHeader = req.headers['authorization']
    // check if bearer undifine
    if (typeof bearerHeader !== 'undefined') {
        // split the token at space of barier
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next middleware
        jwt.verify(req.token, SCREET_KEY, (err, authData) => {
            if (err) {
                response.bad("Token Expired", res)
            } else {
                next()
            }
        } )
        
    } else {
        //forbiden
        response.bad("Authorization not found", res)
    }

}
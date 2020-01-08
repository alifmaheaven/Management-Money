'use strict';

require('dotenv').config()

var response = require('./../response/res');
var connection = require('./../databases/conn');

exports.getTypes = function(req, res) {
    connection.query('SELECT * FROM types', 
    function (error, result){
        if(error){
            console.log(error)
            response.bad("Berhasil gagal mendapatkan types!", res)
        } else{
            response.ok(result, res)
        }
    });
};

exports.createTypes = function(req, res) {
    var name = req.body.name;
    var description = req.body.description;

    connection.query('INSERT INTO types (name, description) values (?,?)',
    [ name, description ], 
    function (error, result){
        if(error){
            console.log(error)
            response.ok("Berhasil gagal menambahkan Type!", res)
        } else{
            response.ok("Berhasil menambahkan Type!", res)
        }
    });
};

exports.updateTypes = function(req, res) {
    var id = req.body.id
    var name = req.body.name;
    var description = req.body.description;

    connection.query('UPDATE types SET name = ?, description = ? WHERE id = ?',
    [ name, description, id], 
    function (error, result){
        if(error){
            console.log(error)
            response.ok("Berhasil gagal merubah Type!", res)
        } else{
            console.log(result);
            response.ok("Berhasil merubah Type!", res)
        }
    });
};

exports.deleteTypes = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM types WHERE id = ?',
    [ id ], 
    function (error, result){
        if(error){
            console.log(error)
            response.ok("Berhasil gagal menghapus types!", res)
        } else{
            response.ok("Berhasil menghapus types!", res)
        }
    });
};
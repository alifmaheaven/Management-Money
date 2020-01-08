'use strict';

require('dotenv').config()

var response = require('./../response/res');
var connection = require('./../databases/conn');

exports.getCategory = function(req, res) {
    connection.query('SELECT * FROM categories', 
    function (error, result){
        if(error){
            console.log(error)
            response.bad("Berhasil gagal mendapatkan categories!", res)
        } else{
            response.ok(result, res)
        }
    });
};

exports.createCategories = function(req, res) {
    var types_id = req.body.types_id
    var name = req.body.name;
    var description = req.body.description;

    connection.query('INSERT INTO categories (types_id, name, description) values (?,?,?)',
    [ types_id, name, description ], 
    function (error, result){
        if(error){
            console.log(error)
            response.ok("Berhasil gagal menambahkan categories", res)
        } else{
            response.ok("Berhasil menambahkan categories", res)
        }
    });
};

exports.updateCategories = function(req, res) {
    var id = req.body.id
    var types_id = req.body.types_id
    var name = req.body.name;
    var description = req.body.description;

    connection.query('UPDATE categories SET name = ?, description = ?, types_id = ? WHERE id = ?',
    [ name, description, types_id, id], 
    function (error, result){
        if(error){
            console.log(error)
            response.ok("Berhasil gagal merubah categories", res)
        } else{
            console.log(result);
            response.ok("Berhasil merubah categories", res)
        }
    });
};

exports.deleteCategories = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM categories WHERE id = ?',
    [ id ], 
    function (error, result){
        if(error){
            console.log(error)
            response.ok("Berhasil gagal menghapus categories!", res)
        } else{
            response.ok("Berhasil menghapus categories!", res)
        }
    });
};
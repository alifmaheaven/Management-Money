'use strict';

require('dotenv').config()

var response = require('./../response/res');
var connection = require('./../databases/conn');

exports.getJournals = function(req, res) {
    connection.query('SELECT * FROM journals', 
    function (error, result){
        if(error){
            console.log(error)
            response.bad("Berhasil gagal mendapatkan journals!", res)
        } else{
            response.ok(result, res)
        }
    });
};

exports.createJournals = function(req, res) {
    var users_id = req.body.users_id
    var categories_id = req.body.categories_id
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price
    var nota = req.files.nota[0].path
    // console.log(nota);

    connection.query('INSERT INTO journals( users_id, categories_id, name, description, price, nota) VALUES (?,?,?,?,?,?)',
    [ users_id, categories_id, name, description, price, nota ], 
    function (error, result){
        if(error){
            console.log(error)
            response.ok("Berhasil gagal menambahkan journals", res)
        } else{
            response.ok("Berhasil menambahkan journals", res)
        }
    });
};

// exports.updateJournals = function(req, res) {
//     var id = req.body.id
//     var types_id = req.body.types_id
//     var name = req.body.name;
//     var description = req.body.description;

//     connection.query('UPDATE journals SET name = ?, description = ?, types_id = ? WHERE id = ?',
//     [ name, description, types_id, id], 
//     function (error, result){
//         if(error){
//             console.log(error)
//             response.ok("Berhasil gagal merubah journals", res)
//         } else{
//             console.log(result);
//             response.ok("Berhasil merubah journals", res)
//         }
//     });
// };

// exports.deleteJournals = function(req, res) {
    
//     var id = req.body.id;

//     connection.query('DELETE FROM journals WHERE id = ?',
//     [ id ], 
//     function (error, result){
//         if(error){
//             console.log(error)
//             response.ok("Berhasil gagal menghapus journals!", res)
//         } else{
//             response.ok("Berhasil menghapus journals!", res)
//         }
//     });
// };
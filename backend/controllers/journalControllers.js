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
    var types_id = req.body.types_id
    var name = req.body.name;
    var description = req.body.description;

    connection.query('INSERT INTO journals (types_id, name, description) values (?,?,?)',
    [ types_id, name, description ], 
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
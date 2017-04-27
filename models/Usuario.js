'use strict';

const mongoose = require('mongoose');


const usuarioSchema = mongoose.Schema({
	nombre: {type : String , unique : true, required : true},
	email: {type : String , unique : true, required : true},
	clave: {type : String , unique : true}
});

var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;


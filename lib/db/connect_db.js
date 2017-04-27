'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const conn = mongoose.connection;


conn.on('error', function(){
	console.log('Error de conexión con MongoDB');
});

conn.once('open', function(){
	console.log('Conexión establecida con MongoDB');
});

// Realizamos la conexión

mongoose.connect('mongodb://localhost/nodepop');
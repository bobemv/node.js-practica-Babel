'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const modelsFolder = './../../models/';
const anunciosJSON = './lib/db/anuncios.json';


mongoose.Promise = global.Promise;

const conn = mongoose.connection;

function createDatabase(conn){
	conn.db.dropDatabase((err) => {
	if(err){
		//console.log('Error eliminando la base de datos (no existía con anterioridad)');
	}});


	const Anuncio = require(modelsFolder+'Anuncio.js');

	const json_obj = JSON.parse(fs.readFileSync(anunciosJSON));
	
	// Cargamos los anuncios
	json_obj.anuncios.forEach( function(element, index) {
		var doc = new Anuncio(element);
		doc.save();
	});

	return Promise.resolve();	
}

conn.on('error', function(){
	console.log('Connection closed');
});

conn.once('open', function(){


	const p = createDatabase(conn);

	p.then(function(){
		conn.close();
	});
});

mongoose.connect('mongodb://localhost/nodepop');
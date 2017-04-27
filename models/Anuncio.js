'use strict';
const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [String]
});

anuncioSchema.statics.list = function(
    filters, limit, start, sort,
    callback) {
    const query = Anuncio.find(filters);

    query.limit(limit);
    query.skip(start);
    query.sort(sort);

    //ejecuto la query
    query.exec(callback);
}

var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;

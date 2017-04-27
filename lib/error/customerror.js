'use strict';

module.exports = function CustomError(type, lang){
	this.name = 'CustomError';
	this.type = (type || '');
	const config = {};
	config.lang = lang;
	config.langFile = './../../lib/lang/traducciones.json';
	const i18n = require('i18n-nodejs')(config.lang, config.langFile);
	this.message = (i18n.__(type) || '');
	//this.stack = (new Error()).stack;
};


require('util').inherits(module.exports, Error);

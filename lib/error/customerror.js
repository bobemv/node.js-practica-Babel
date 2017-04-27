'use strict';

module.exports = function CustomError(type, i18n){
	this.name = 'CustomError';
	//this.type = (type || '');
	//console.log(type);
	this.message = (i18n.__(type) || '');
	//this.stack = (new Error()).stack;
};


require('util').inherits(module.exports, Error);

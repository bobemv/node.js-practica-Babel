'use strict';

var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const CustomError = require('./../../lib/error/customerror');



router.post('/registro', function(req, res, next){
//
	const nuevousuario = req.body;
//console.log(nuevousuario);
	/*if(!nuevousuario.nombre || !nuevousuario.email || !nuevousuario.clave){
		
		next(new CustomError('NO_PARAMS', 'es'));
		return;
	}*/
//console.log(req.params.i18n);
	nuevousuario.clave = crypto.createHash('sha256').update(nuevousuario.clave).digest('hex');

		const doc = new Usuario(nuevousuario);

		doc.save(function(err, nuevousuario){
			if(err){
                //console.log(req.i18n);
                //console.log(req.i18n.__('USER_NOT_FOUND'))
				next(new CustomError('USER_NOT_FOUND', req.i18n));
				return;
			}

			res.json({ success: true, usuario: nuevousuario});
		});

});


router.post('/authenticate', function(req, res, next){

	//recibimos credenciales
    const email = req.body.email;
    const clave = req.body.clave;
    if(!email || !clave){
        next(new CustomError('NO_PARAMS', req.i18n));
        return;
    }
    // buscamos el usuario en la base de datos
    Usuario.findOne({ email: email }).exec((err, usuario) => {
        if (err) {
            next(new CustomError('INTERNAL_ERROR', req.i18n));
            return;
        }

        if (!usuario) {
            next(new CustomError('EMAIL_NOT_REGISTERED', req.i18n));
            return;
        }

        // comprobamos su clave

        if (crypto.createHash('sha256').update(clave).digest('hex') !== usuario.clave) {
            next(new CustomError('PSW_INCORRECT', req.i18n));
            return;
        }
        // creamos un token JWT

        jwt.sign({ usuario_id: usuario._id }, config.jwtSecret, config.jwtConfig, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            // se lo devolvemos
            res.json({ success: true, token: token });
        });

    });

});
module.exports = router;

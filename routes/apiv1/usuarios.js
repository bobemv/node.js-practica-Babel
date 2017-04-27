'use strict';

var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const CustomError = require('./../../lib/error/customerror');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registro', function(req, res, next){
//
	const nuevousuario = req.body;

	/*if(!nuevousuario.nombre || !nuevousuario.email || !nuevousuario.clave){
		
		next(new CustomError('NO_PARAMS', 'es'));
		return;
	}*/

	nuevousuario.clave = crypto.createHash('sha256').update(nuevousuario.clave).digest('hex');

		const doc = new Usuario(nuevousuario);

		doc.save(function(err, nuevousuario){
			if(err){
				next(new Error('Nombre o email ya en uso'));
				return;
			}

			res.json({ success: true, usuario: nuevousuario});
		});

});


router.post('/authenticate', function(req, res, next){

	//recibimos credenciales
    const email = req.body.email;
    const clave = req.body.clave;
    // buscamos el usuario en la base de datos
    Usuario.findOne({ email: email }).exec((err, usuario) => {
        if (err) {
            next(new Error('Email no registrado'));
            return;
        }

        if (!usuario) {
            res.json({ success: false, error: 'Email no válido' });
            return;
        }

        // comprobamos su clave

        if (crypto.createHash('sha256').update(clave).digest('hex') !== usuario.clave) {
            res.json({ success: false, error: 'Contraseña incorrecta' });
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

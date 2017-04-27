'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config');

// exportamos un middleware de autenticacion


module.exports = function(req, res, next) {

    // recoger el token jwt
    const token = req.body.token || req.query.token || req.get('x-access-token');


    // si no me llega el token responder no autorizado
    if (!token) {
        const error = new Error('Necesitas un token de autenticacion');
        error.status = 401;
        next(error);
        return;
    }

    // validar el token
    jwt.verify(token, config.jwtSecret, (err, tokenDecodificado) => {
        // si el token ha sido modificado o ha expirado
        // nos dara este error
        if (err) {
            const error = new Error('El token no es valido');
            error.status = 401;
            next(error);
            return;
        }

        //el token es correcto
        req.usuario_id = tokenDecodificado.usuario_id;
        next();
    });
};

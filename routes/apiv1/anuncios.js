'use strict';
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Anuncio = mongoose.model('Anuncio');

const jwtAuth = require('../../lib/auth/jwtAuth');

router.use(jwtAuth);

/* GET home page. */
router.get('/', function(req, res, next) {

	const filters = {};
	if(req.query.tag){
		filters.tags = req.query.tag;
	}
    if(req.query.venta){
		filters.venta = req.query.venta;
	}
   	if(req.query.nombre){
    	filters.nombre = new RegExp('^' +req.query.nombre, 'i');
    }
    if(req.query.precio){
    	const precios = req.query.precio.split('-');

    	if(precios[0] && precios[1]){
    		filters.precio = {'$gte': parseFloat(precios[0]), '$lte': parseFloat(precios[1])};
    	}
    	else if (precios[0]) {
    		const aux = req.query.precio.split('');
    		if(aux[0] === '-'){
    			filters.precio = {'$lte': parseFloat(precios[0])};
    		}
    		else if (aux[aux.length-1] === '-'){
    			filters.precio = {'$gte': parseFloat(precios[0])};
    		}
    		else{
    			filters.precio = parseFloat(req.query.precio);
    		}
    		
    	}
    	
    }
    const start = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    //const includeTotal = req.query.includeTotal;
    //const filters.token = req.query.token;
    
    
    

	Anuncio.list(filters, limit, start, sort, (err, anuncios) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: anuncios });
    });

	
});



module.exports = router;

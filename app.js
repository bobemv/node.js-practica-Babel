'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');
require('./lib/db/connect_db');
require('./models/Anuncio.js');
require('./models/Usuario.js');

const anuncios = require('./routes/apiv1/anuncios.js');
const usuarios = require('./routes/apiv1/usuarios.js');
const i18n = require('i18n');

i18n.configure({
    locales:['es', 'en'],
    directory: __dirname+'/lib/lang/'
});


var app = express();

app.use(i18n.init);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/:lang', function(req, res, next){
	const lang = req.params.lang;
	switch(lang){
        case 'es':
        	i18n.setLocale('es');
        break;
        case 'en':
       		i18n.setLocale('en');
        break;
        default:
        	i18n.setLocale('es');
        break;
    }
    req.i18n = i18n;
    //console.log(req.params);
    next();
});

app.use('/:lang?/anuncios', anuncios);
app.use('/:lang?/usuarios', usuarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

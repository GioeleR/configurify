// risorse esterne da includere (modulo express e due file locali che contengono le rotte)
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var angular = require('./angularRoutes');
var react = require('./reactRoutes');

//creo l'app express
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//definisco i namespace base per due tipologie di rotte: routes e server sono 'router' di rotte
/*app.get('/', function(req, res, next) {
  res.send('Welcome to Express');
});*/
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/angular', angular);
app.use('/react', react);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error ' + err.message + ' - ' + err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('errore' + err.message);
});

module.exports = app;

// risorse esterne da includere (modulo express e due file locali che contengono le rotte)
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var angular = require('./angularRoute');

//creo l'app express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));			//dico all'app dove sono le view
app.set('view engine', 'jade');								//e in che formato sono

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));	//dico all'app di servire tutto il contenuto della cartella 'public' come statico

//definisco i namespace base per due tipologie di rotte: routes e users sono 'router' di rotte
app.use('/', routes);
app.use('/users', users);
app.use('/angular', angular);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

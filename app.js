var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handleErrorLanguage = require('./lib/handleErrorLanguages');


var app = express();

require('./lib/connectMongoose');
require('./models/Ad');
require('./models/User');

var ads = require('./routes/apiv1/ads');
var users = require('./routes/apiv1/users');

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


app.use('/apiv1/ads', ads);
app.use('/apiv1/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);

  if(isAPI(req)){

    handleErrorLanguage(req.lang, err.message).then(function (response) {
      console.log(res);
        return res.json({success:false, error: response});
    }).catch (function(err_lang){
        return res.json({success:false, error: response});
    });

    return;

  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function isAPI(req) {
    return req.originalUrl.indexOf('/apiv1') === 0;
}

module.exports = app;

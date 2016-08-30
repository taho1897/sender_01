var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var redis = require('redis');
var redisClient = redis.createClient();
var RedisStore = require('connect-redis')(session);

var auth = require('./routes/auth');
var board = require('./routes/board');
var chatting = require('./routes/chatting');
var contract = require('./routes/contract');
var member = require('./routes/member');
var notice = require('./routes/notice');
var review = require('./routes/review');

var app = express();
app.set('env', 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true
// }));

app.use(session({
  secret : process.env.SESSION_SECRET,
  store : new RedisStore({
    host : "127.0.0.1",
    port : 6379,
    client : redisClient
  }),
  resave : true, //변경 없으면 저장하지 말아라
  saveUninitialized : false // 저장된것 없으면 세션을 저장하지 말아라
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'uploads/images/menus')));


// app.use('/auth', auth);
app.use('/boards', board);
app.use('/chattings', chatting);
app.use('/contracts', contract);
app.use('/members', member);
app.use('/notices', notice);
app.use('/reviews', review);


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
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
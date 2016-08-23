var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var isSecure = require('./common').isSecure;

// 1. use로 strategy 함수 만들기 - name, password가 기본필드라 옵션 변경해야함
passport.use(new LocalStrategy({usernameField: 'api_id'}, function(apiId, done) {
    User.findById(apiId, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        done(null, user)
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findUser(id, function(err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    })
});

router.post('/local/login', isSecure, function(req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                message: 'login failed'
            });
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            next();
        });
    })(req, res, next);
}, function(req, res, next) {
    var user = {};
    user.name = req.user.name;
    user.email = req.user.email;
    res.send({
        message: 'local login',
        user: user
    });
});
router.get('/local/logout', function(req, res, next) {
    req.logout();
    res.send({ message: 'local logout' });
});

module.exports = router;

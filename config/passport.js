var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');


passport.serializeUser((user, done)=>{
    done(null, {id : user.id, isAdmin: user.isAdmin});
});

passport.deserializeUser((user, done)=>{
    if(user.isAdmin === false){
        User.findById(user.id, (err, user)=>{
            done(err, user);
        });
    }else{
        Admin.findById(user.id, (err, user)=>{
            done(err, user);
        });
    }
});


//local strategy for admin login
passport.use('local.admin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Admin.findOne({'email': email}, (err, user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'No admin found!'});
        }
        if(!user.comparePassword(password)){
            return done(null, false, {message: 'Wrong password.'})
        }
        return done(null,user);
    });
}));

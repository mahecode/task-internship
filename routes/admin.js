const express = require('express');
const router = express.Router();

const passport = require('passport');

const csrf = require('csurf');
const csrfProtection = csrf();
const ObjectID = require('mongodb').ObjectID;

const Admin = require('../models/admin');
const User = require('../models/user');


router.post('/add', isloggedIn, (req, res, next)=>{
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        experience: req.body.experience,
        position: req.body.position,
        batch: req.body.batch,
        course: req.body.course
    });
    user.save().then((doc)=>{
        console.log('User added');
    }, (e)=>{
        console.log(e);
    });
    res.redirect('/');
});

router.use(csrfProtection);

router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/');
  });

router.get('/add', isloggedIn, (req, res, next)=>{
    res.render('users/addUser', {token: req.csrfToken()});
});


router.get('/admin-login', (req, res, next)=>{
    var messages = req.flash('error');
    res.render('users/admin', {token: req.csrfToken(), messages: messages, hasErrors: messages.length >0});
});

router.post('/admin-login', passport.authenticate('local.admin',{
    successRedirect: '/',
    failureRedirect: '/admin/admin-login',
    failureFlash: true
}));

function isloggedIn(req, res, next){
    if(req.isAuthenticated() && req.user.isAdmin === true){
        return next();
    }
    res.redirect('/');
}


module.exports = router;
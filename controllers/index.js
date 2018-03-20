let express = require('express');
let router = express.Router();
let passport =require('passport');
let mongoose = require('mongoose');
let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Car Tracker' , message: 'COMP 2106 In-Class Node Application',user: req.user });

});
//GET:/ about

router.get('/about',(req, res, next) => {
  //load about view
    res.render('about', {
      title: 'About the car tracker',
        message: 'This app is built with MEAN stack',
        user: req.user
    });
});

//GET: /contact
router.get('/contact',(req, res, next) => {
    //load about view
    res.render('contact', {
        title: 'Contact Us',
        message: 'Here is the contact Information',
        user: req.user
    });
});
module.exports = router;

//GET: /register
router.get('/register', (req, res, next)=>{
    res.render('register', {
        title:'Register',
        user: req.user
    });
});

//POST: /register
router.post('/register', function (req, res, next) {
    User.register(new User ({
            username: req.body.username,
            phone: req.body.phone,
        }),req.body.password, (err, user) => {
            if (err) {
                res.render('register',{title:'error'});
            }
            else {
                    res.redirect('/cars');

            }
        });
});


//GET: /login

router.get('/login', (req, res, next)=>{

    let messages = req.session.messages || [];

    res.render('login', {
        title:'Login',
        messages: messages,
        user: req.user
    });
});

//POST: /login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/cars',
    failureRedirect: '/login',
    failureMessage:'Invalid login'

}));

//GET: /logout
router.get('/logout', (req, res, next)=>{
    req.session.messages = [];
    req.logout();
    res.redirect('/')
});

//Get: / Google
router.get('/google', passport.authenticate('google',{scope:['profile','email'],}));

//Get: /callback
router.get('/google/callback', passport.authenticate('google', {
        // failed google auth
        failureRedirect: '/login',
        failureMessage: 'Invalid Login',
        scope: 'email',
    }),
    // successful google auth
    (req, res, next) => {
        res.redirect('/cars');
    }
);
module.exports=router;
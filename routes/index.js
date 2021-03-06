var express = require('express');
var router = express.Router();
var userModel= require('./users');
var passport = require('passport');
var localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function(req,res){
  res.render('login');
});
router.get('/register',function(req,res){
  res.render('reg');
});
router.get('/profile',isLoggedIn,function(req,res){
  res.render('profile');
});
router.post('/login',function(req,res){
  res.render('profile');
})
router.get('/logout',function(req,res){
  req.logOut();
  res.redirect('/');
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
router.post('/register',function(req,res){
  var userData = new userModel({
    name:req.body.name,
    username:req.body.username,
    email:req.body.email
  });
  userModel.register(userData,req.body.password)
    .then(function(reUser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
    })
});


module.exports = router;

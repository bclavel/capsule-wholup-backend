var express = require('express');
var router = express.Router();
var userModel = require('../models/users');


router.get('/', function(req, res, next) {
  res.json({result : 'Yoooh!'});
});

router.get('/signin', function(req, res, next) {
  var isUserExist = false;
  userModel.find({email: req.query.email, password : req.query.password})
  .exec(function (err, data) {
    if (data.length > 0) {
      isUserExist = true
    }
    res.json({ result : isUserExist });
  })
});

router.post('/signup', function(req, res, next) {
  console.log('POST signup');
  var newUser = new userModel({
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    password : req.body.password,
 });

 newUser.save(
   function(error, user) {
     console.log(user);
     res.json({ user });
   }
 )
});

module.exports = router;

var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var nodemailer=require('nodemailer');
var config=require('../config');
var transporter=nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeEscape - a platform for Smooth Coding Interview' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'CodeEscape - a platform for Smooth Coding Interview' });
});
router.route('/contact').get(function(req, res, next) {
  res.render('contact', { title: 'Hey! send us your query ' });
})
.post(function(req,res,next){
  req.checkBody('name','Empty name').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('message','Empty message').notEmpty();
  var errors = req.validationErrors();
  if(errors)
  {
    res.render('contact',{
      title:'Thanks your message is recieved',
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      errorMessages: errors
    });
  }else{
  var mailOptions={
    form:'CodeEscape<no-reply@codesc.com>',
    to:'officialakashranjan01@gmail.com',
    subject:'You got a new message form visitor 😭-😭',
    text:req.body.message
  };
  transporter.sendMail(mailOptions,function(error,info){
    if(error)
    {
      return console.log(error);
    }
    res.render('thanks',{title:'Thanks you , your message is recieved'});
  });
    
  }
});

module.exports = router;

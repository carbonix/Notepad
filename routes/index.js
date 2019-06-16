var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Data = require('../models/data');
var fs = require('fs');
var multer = require('multer');
var PdfReader = require("pdfreader").PdfReader;

var store = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, '../public/images');
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+'.'+file.originalname);
  }
});


var upload = multer({storage:store}).single('file');
/* GET home page. */

router.get('/', function(req, res, next){
  res.render('home');
});
router.get('/file', function(req, res, next){
  
  

   
   res.render('content');
    


 });

router.post('/file', function(req, res, next){
  upload(req, res, function(err)
  {
    if(err)
    {
      return res.status(501).json({error:err});
    }

    return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
  });
});

router.get('/:name', function(req, res, next) {
  var username = req.params.name;
  
  mongoose.connect("mongodb://localhost:27017/Notepad", { useNewUrlParser: true });

  Data.findOne({name: username}, function(err, data){
    
    var note2 = new String();
      if(data){
        res.render('index',{title:'Notepad', data: data});
      }
      else{
        var newdata = new Data({
        name: username,
        data: ""
        
      });
      
      res.render('index',{title:'Notepad', data: newdata});
    }
      
      
    });
    
});

 router.post('/:name', function(req, res, next){
   var note = req.body.data;
   console.log(note);
   var username = req.params.name;
   Data.find({name: username}, function(data){
     if(data){
       data.data = note;
     }
     else{
      var newdata = new Data({
        name: username,
        data: note
        
      });

        newdata.save();
     }
     res.redirect('/'+username);
   });
 });

 router.post('/', function(req,res,next)
 {
    var username = req.body.username;
    console.log(username);
    res.redirect('/'+username);
 });

 

module.exports = router;

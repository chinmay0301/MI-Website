var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'MI'
});

connection.connect();

router.get('/',function(req,res){
  params = req.body;
connection.query('SELECT MI_NUMBER from register where CONTACT LIKE '+connection.escape(params.mobile), function(err,rows,fields){
      if(err)
      {
        var obj={
          status:false,
          message:"Error connecting to database",
          data:err
        };
        res.send(obj);
      }

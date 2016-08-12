var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'MI'
});

router.get('/:id',function(req,res){
    var obj;
    connection.query('SELECT MI_NUMBER FROM register where CONTACT =' + connection.escape(8879178724),function(err,results,field)
    {
       if(!err){
       console.log(req.params.mobile);
       var obj = {
         status: true,
         message: "Successfully registered",
         data: results[0]
        
       }
     console.log(obj);
     }
     else {
       var obj = {
         status: false,
         message: "Registation failed"
       }
     }

      res.json(obj);    
    });
  }); 
 
module.exports = router;


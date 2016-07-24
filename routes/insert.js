var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'MI'
});

var insert=function(params,new_mi_no)
{
 
  new_mi_no=new_mi_no.toUpperCase();
  console.log(new_mi_no);
       connection.query('INSERT INTO register (MI_NUMBER,NAME,EMAIL,CONTACT,DOB,GENDER,CITY,COLLEGE,YEAR) VALUES (' + connection.escape(new_mi_no) + ','+ connection.escape(params.name) + ',' + connection.escape(params.email) + ',' + connection.escape(params.mobile) + ',' + connection.escape(params.dob) + ',' + connection.escape(params.gender) + ',' + connection.escape(params.city) + ',' + connection.escape(params.college) + ',' + connection.escape(params.year) + ')',function selectCb(err, results, fields)
   {
    if(err){
      var obj={
        status:false,
        message:"Error in inserting data into database please try again",
        data:err
    
      }
      console.log('error in inserting'); 
      res.send(obj);
    }
    else{
      var obj={
        status:true,
        new_mi_no:new_mi_no,
        message:"Successfully Registered"
      }
      res.send(obj);
      //sending mails
console.log('registerd');


    }
   });
}


//var new_mi_no = 42;
connection.connect();


router.post('/', function(req, res){
	params = req.body;
	console.log('entering into route');
    //insert(params,42);
     //connection.query('INSERT INTO test (name,college,gender) VALUES (' + connection.escape(params.name) + ', ' + connection.escape(params.college)+','+connection.escape(params.gender)+')', function selectCb(err,results,fields
	 		//if(err)
        //{throw(err);}
      //else
        //console.log('saved it!');
     
    console.log(params);
  var email_reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  var mobile_reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  if(params.name!=""&&email_reg.test(params.email)&&mobile_reg.test(params.mobile)&&params.year!=""&&params.gender!=""&&params.city!=undefined&&params.college!=0)
  {
    connection.query('SELECT * from register where CONTACT LIKE '+connection.escape(params.mobile), function(err,rows,fields){
      if(err)
      {
        var obj={
          status:false,
          message:"Error connecting to database",
          data:err
        };
        res.send(obj);
      }
      else if(rows[0]!=null)
      {
        var obj={
          status:false,
          message:"The user is already registered",
          data:rows[0]
        };
        res.send(obj);
      }
      else{
        var mi=params.name.slice(0,3);
        var MiNo ='MI-'+mi+'-%';
        var new_mi_no;
        connection.query("SELECT MI_NUMBER from register where MI_NUMBER LIKE '"+MiNo+"' ORDER BY MI_NUMBER DESC LIMIT 1",function(err,rowss,fields){
          if(err)
          {
            console.log(err);
            var obj={
              status:false,
              message:"Error in inserting data into database please try again",
              data:err
            }
            res.send(obj);
          }
          else
          {
            if(rowss[0]==null)
            {
              new_mi_no='MI-'+mi+'-101';
             insert(params,new_mi_no);
            }
            else if(parseInt(rowss[0].mi_no.split("-")[2])==999)
            {
              var new_MiNo='MI-'+mi+'-1___';
              connection.query('SELECT MI_NUMBER FROM register where MI_NUMBER LIKE "'+new_MiNo+'" ORDER BY MI_NUMBER DESC LIMIT 1', function(err, rowsss, fields) {
                          if(err)
                          {
                            var obj={
                    status:false,
                    message:"Error in inserting data into database please try again",
                    data:err
                  }
                  res.send(obj);
                          }
                          else if(rowsss[0]==null)
                          {
                            new_mi_no='MI-'+mi+'-1000';
                            insert(params,new_mi_no);
                          }
                          else
                          {
                          var no=parseInt(rowsss[0].mi_no.split("-")[2])+1;
                              new_mi_no='MI-'+mi+'-'+no;
                              insert(params,new_mi_no);
                          }
                        });
            }
            else
            {
              var no=parseInt(rowss[0].mi_no.split("-")[2])+1;
                    new_mi_no='MI-'+mi+'-'+no;
                    insert(params,new_mi_no);
            }
          }
        })//end of second query

      }
    }) //end of first query
  }
  else
  {
    var obj={
      status:false,
      message:"Some Fields Missing",
      data:err
    }
    res.send(obj);
    console.log('incorrect data');
  }  

	 });



module.exports = router;


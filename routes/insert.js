var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '*****',
  database : 'MI'
});

var insert=function(params,new_mi_no)
{
 
  new_mi_no=new_mi_no.toUpperCase();
  console.log(new_mi_no);
  console.log("Inserting new user, in insert function now\n\n");
  connection.query('INSERT INTO register (MI_NUMBER,NAME,EMAIL,CONTACT,DOB,GENDER,CITY,COLLEGE,YEAR,FB_ID) VALUES (' + connection.escape(new_mi_no) + ','+ connection.escape(params.name) + ',' + connection.escape(params.email) + ',' + connection.escape(params.mobile) + ',' + connection.escape(params.dob) + ',' + connection.escape(params.gender) + ',' + connection.escape(params.city) + ',' + connection.escape(params.college) + ',' + connection.escape(params.year) + ',' + connection.escape(params.fb_id)+')',function selectCb(err, results, fields)
   {
    if(err){
      var obj={
        status:false,
        message:"Error in inserting data into database please try again",
        data:err
    
      }
      console.log('error in inserting');//res.send(obj);
    }
    else{
      var obj={
        status:true,
        new_mi_no:new_mi_no,
        message:"Successfully Registered"
      }
      //res.send(obj);
      //sending mails
console.log('registerd');
   }
   });
}

//var new_mi_no = 42;
connection.connect();


router.post('/fbLogin',function(req,res){
    params = req.body;
    console.log(params);
    // fb_id = req.params.fb_id;
    connection.query('SELECT * from register where fb_id like' + connection.escape(params.fb_id) + ';' , function(err,rows,fields){
    console.log("Query Made.");
      if(err) {     //handle nonsense errors

          console.log("Error");
          var obj = {
              status: false,
              message: "Error connecting to database",
              data: err
          };
          res.send(obj);
      }

      else if(rows[0]!=null) {

        console.log("Here");

            var r = rows[0];
            var user = {
                message : "registered",
                mi_number: r.mi_number,
                name: r.name,
                email: r.email,
                dob: r.dob,
                college: r.college,
                gender: r.gender,
                year: r.year,
                contact: r.contact,
                city: r.city,
                fb_id: r.fb_id
            };  
            res.json(user);    
      }

      else {
        console.log("No rows");
        res.json({"message":"not_registered"});
      }

    });
});


// router.post('/', function(req, res) {
//     params = req.body;
//     console.log('entering into route');
//     //insert(params,42);
//     //connection.query('INSERT INTO test (name,college,gender) VALUES (' + connection.escape(params.name) + ', ' + connection.escape(params.college)+','+connection.escape(params.gender)+')', function selectCb(err,results,fields
//     //if(err)
//     //{throw(err);}
//     //else
//     //console.log('saved it!');

//     console.log(params);
//     var email_reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
//     var mobile_reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
//     if (params.name != "" && email_reg.test(params.email) && mobile_reg.test(params.mobile) && params.year != "" && params.gender != "" && params.city != undefined && params.college != 0) {
//         connection.query('SELECT * from register where CONTACT LIKE ' + connection.escape(params.mobile), function(err, rows, fields) {
//                 console.log("Select from register!");
//                 if (err) {
//                     var obj = {
//                         status: false,
//                         message: "Error connecting to database",
//                         data: err
//                     };
//                     res.send(obj);
//                 } else if (rows[0] != null) {
//                     console.log("Already Registered");
//                     var obj = {
//                         status: false,
//                         message: "The user is already registered",
//                         data: rows[0]
//                     };
//                     res.send(obj);
//                 } else {
//                     console.log("Not registered");
//                     console.log(typeof(params.name) + "\n\n\n\n");
//                     var mi = String(params.name).slice(0,3);
//                     var MiNo = 'MI-' + mi + '-%';
//                     var new_mi_no;
//                     connection.query("SELECT MI_NUMBER from register where MI_NUMBER LIKE '" + MiNo + "' ORDER BY MI_NUMBER DESC LIMIT 1", function(err, rowss, fields) {
//                             if (err) {
//                                 console.log(err);
//                                 var obj = {
//                                     status: false,
//                                     message: "Error in inserting data into database please try again",
//                                     data: err
//                                 }
//                                 res.send(obj);
//                             } else {
//                                 console.log("Going to split MI number");
//                                 if (rowss[0] == null) {

//                                     console.log('null Log');
                                  
//                                     new_mi_no = 'MI-' + mi + '-101';
//                                     insert(params, new_mi_no);
//                                     console.log(new_mi_no+"\n\n\n");

//                                 } else if (parseInt(rowss[0].mi_number.split("-")[2]) == 999) {

//                                     console.log("Split MI Number");

//                                     var new_MiNo = 'MI-' + mi + '-1___';
//                                     connection.query('SELECT MI_NUMBER FROM register where MI_NUMBER LIKE "' + new_MiNo + '" ORDER BY MI_NUMBER DESC LIMIT 1', function(err, rowsss, fields) {
//                                         if (err) {
//                                             var obj = {
//                                                 status: false,
//                                                 message: "Error in inserting data into database please try again",
//                                                 data: err
//                                             }
//                                             res.send(obj);
//                                         } else if (rowsss[0] == null) {
//                                             new_mi_no = 'MI-' + mi + '-1000';
//                                             insert(params, new_mi_no);
//                                         } else {
//                                           console.log("Split MI Number1");

//                                             var no = parseInt(rowsss[0].mi_number.split("-")[2]) + 1;
//                                             new_mi_no = 'MI-' + mi + '-' + no;
//                                             insert(params, new_mi_no);
//                                         }
//                                     });
//                                 } else {
//                                   console.log("Split MI Number2");

//                                     var no = parseInt(rowss[0].mi_number.split("-")[2]) + 1;
//                                     new_mi_no = 'MI-' + mi + '-' + no;
//                                     insert(params, new_mi_no);
//                                 }
//                             }
//                         }) //end of second query

//                 }
//             }) //end of first query
//     } else {
//         var obj = {
//             status: false,
//             message: "Some Fields Missing",
//             data: err
//         }
//         res.send(obj);
//         console.log('incorrect data');
//     }

// });

router.post('/', function(req, res){
  params = req.body;
        num = params.mobile;
       
  console.log('entering into route');
    //insert(params,42);
     //connection.query('INSERT INTO test (name,college,gender) VALUES (' + connection.escape(params.name) + ', ' + connection.escape(params.college)+','+connection.escape(params.gender)+')', function selectCb(err,results,fields
      //if(err)
        //{throw(err);}
      //else
        //console.log('saved it!');
     var obj;
    //console.log(params);
  var email_reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  var mobile_reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  if(params.name!=""&&email_reg.test(params.email)&&mobile_reg.test(params.mobile)&&params.year!=""&&params.gender!=""&&params.city!=undefined&&params.college!=0)
  {
    connection.query('SELECT * from register where CONTACT LIKE '+connection.escape(params.mobile), function(err,rows,fields){
      if(err)
      {
         obj={
          status:false,
          message:"Error connecting to database",
          data:err
        };
        
      }
      else if(rows[0]!=null)
      {
       obj={
          status:false,
          message:"The user is already registered",
          data:rows[0].MI_NUMBER
        };

        
      }
      else{
        var mi=params.name.slice(0,3);
        var MiNo ='MI-'+mi+'-%';
        var new_mi_no;
        connection.query("SELECT MI_NUMBER from register where MI_NUMBER LIKE '"+MiNo+"' ORDER BY MI_NUMBER DESC LIMIT 1",function(err,rowss,fields){
          if(err)
          {
            console.log(err);
             obj={
              status:false,
              message:"Error in inserting data into database please try again",
              data:err
            }
            
          }
          else
          {
            if(rowss[0]==null)
            {
              new_mi_no='MI-'+mi+'-101';
              insert(params,new_mi_no);

              
            
            }
 
            else if(parseInt(rowss[0].MI_NUMBER.split("-")[2])==999)
            {
              var new_MiNo='MI-'+mi+'-1___';
              connection.query('SELECT MI_NUMBER FROM register where MI_NUMBER LIKE "'+new_MiNo+'" ORDER BY MI_NUMBER DESC LIMIT 1', function(err, rowsss, fields) {
                          if(err)
                          {
                            obj={
                    status:false,
                    message:"Error in inserting data into database please try again",
                    data:err
                  }
               
                          }
                          else if(rowsss[0]==null)
                          {
                            new_mi_no='MI-'+mi+'-1000';
                            insert(params,new_mi_no);
                            
                          }
                          else
                          {
                          var no=parseInt(rowsss[0].MI_NUMBER.split("-")[2])+1;
                              new_mi_no='MI-'+mi+'-'+no;
                              insert(params,new_mi_no);
                            
                          }
                        });
            }
            else
            {
              var no=parseInt(rowss[0].MI_NUMBER.split("-")[2])+1;
                    new_mi_no='MI-'+mi+'-'+no; 
                    insert(params,new_mi_no);
                    
           }
          }
        })//end of second query

      }
    }) //end of first query
   
console.log('done');

  }
  else
  {
     obj={
      status:false,
      message:"Some Fields Missing",
      data:err
    }
        console.log('incorrect data');
  }  
  
 });

router.get('/', function(req,res) 
{
var obj;
console.log('entering into get');
 console.log(num);
//console.log(num);
connection.query('SELECT * from register where CONTACT LIKE '+connection.escape(num), function(err,rows,fields){
      if(err)
      {
         
        obj={
          status:false,
          message:"Error connecting to database",
          data:err
        };
      }
      else if(rows[0]!=null)
      {
       obj={
          status:true,
          message:"Your MI number",
          data:rows[0].MI_NUMBER
        };

        console.log(obj);
        res.json(obj);        
      }
});

 
});

module.exports = router;


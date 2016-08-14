var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

 // handle the route at yourdomain.com/sayHello

router.post('/',function (req, res) {
    // Not the movie transporter!
   
var text = 'It fucking worked! \n\n';

var mailOptions = {
    from: 'chinmay0301@gmail.com', // sender address
    to: 'chinmay0301@gmail.com', // list of receivers
    subject: 'Email', // Subject line
    text: text 
};

 var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'chinmay0301@gmail.com', // Your email id
            pass: '******' // Your password
        }
    });

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }
   else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    }
}); 

});   



module.exports = router;

var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

var router = express.Router();
app.use('/sayHello', router);
router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'chinmay0301@gmail.com', // Your email id
            pass: 'silvermedal' // Your password
        }
    });
    
}



var text = 'Hello world from \n\n';

var mailOptions = {
    from: 'chinmay0301@gmail.com>', // sender address
    to: 'sgaunekar96@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.ressponse});
    };
});

module.exports = app

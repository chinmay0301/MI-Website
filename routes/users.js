var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var obj = { name: 'MI', college:'IITB'};
  res.json(obj);
   
});

module.exports = router;

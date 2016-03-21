var express = require('express');
var router = express.Router();

router.get('/manichinofy/maglie.json', function(req, res, next) {
  res.sendFile(__dirname+'/public/manichinofy/maglie.json');
});
router.get('/manichinofy/pantaloni.json', function(req, res, next) {
  res.sendFile(__dirname+'/public/manichinofy/pantaloni.json');
});
router.get('/manichinofy/scarpe.json', function(req, res, next) {
  res.sendFile(__dirname+'/public/manichinofy/scarpe.json');
});
router.get('/manichinofy/config', function(req, res, next) {
  res.sendFile(__dirname+'/public/manichinofy/config.json');
});
router.put('/manichinofy/config/config.json', function(req, res, next){
  res.send('ok');
});
module.exports = router;

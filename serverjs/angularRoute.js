var express = require('express');
var router = express.Router();
var engine = require('./public/manichinofy/engine');

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
  res.sendFile(__dirname+'/public/manichinofy/config/config.json');
});
router.put('/manichinofy/config', [engine.control, engine.setConfig]);
router.delete('/manichinofy/config', engine.deleteConfig);

module.exports = router;

var express = require('express');
var router = express.Router();
var engine = require('./engine');

router.get('/manichinofy/maglie.json', function(req, res, next) {
  res.sendFile(__dirname + '/public/manichinofy-data/maglie.json');
});
router.get('/manichinofy/pantaloni.json', function(req, res, next) {
  res.sendFile(__dirname + '/public/manichinofy-data/pantaloni.json');
});
router.get('/manichinofy/scarpe.json', function(req, res, next) {
  res.sendFile(__dirname + '/public/manichinofy-data/scarpe.json');
});
router.get('/manichinofy/config', function(req, res, next) {
  res.sendFile(__dirname + '/public/manichinofy-data/config/config.json');
});
router.put('/manichinofy/config', [engine.control, engine.setConfig]);

router.delete('/manichinofy/config', engine.deleteConfig);

router.use('/manichinofy', express.static(__dirname + '/public/manichinofy-angular'));

module.exports = router;
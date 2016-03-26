var express = require('express');
var router = express.Router();
var engine = require('./public/manichinofy/engine');								//file contente i middleware

router.get('/manichinofy/maglie.json', function(req, res, next) {					//restituisce il vettore di maglie
  res.sendFile(__dirname+'/public/manichinofy/maglie.json');
});
router.get('/manichinofy/pantaloni.json', function(req, res, next) {				//restituisce il vettore di pantaloni
  res.sendFile(__dirname+'/public/manichinofy/pantaloni.json');
});
router.get('/manichinofy/scarpe.json', function(req, res, next) {					//restituisce il vettore di scarpe
  res.sendFile(__dirname+'/public/manichinofy/scarpe.json');
});
router.get('/manichinofy/config', function(req, res, next) {						//restituisce il vettore di configurazioni
  res.sendFile(__dirname+'/public/manichinofy/config/config.json');
});
router.put('/manichinofy/config', [engine.control, engine.setConfig]);				//chiama 2 middleware per la gestione della richiesta di salvataggio di configurazioni
router.delete('/manichinofy/config', engine.deleteConfig);							//chiama un middleware per l'eliminazione del file di configurazioni

module.exports = router;

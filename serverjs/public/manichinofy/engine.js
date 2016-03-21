var fs = require('fs');
var CONFIG = ('public/manichinofy/config/config.json');

var engine = {};

engine.setConfig = function(req, res, next){
  fs.writeFile(CONFIG, JSON.stringify(req.body), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
  res.send("ok");
};

engine.ciaofuction = function (){};

module.exports = engine;
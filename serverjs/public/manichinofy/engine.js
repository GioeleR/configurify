var fs = require('fs');
var CONFIG = ('public/manichinofy/config/config.json');

var engine = {};

engine.control = function(req, res, next){
	var buffer = new Array();
	fs.readFile(CONFIG, function(err, data){
		if (err) {
			console.error(err);
			if (err.errno==-4058)
				fs.writeFileSync(CONFIG, JSON.stringify({}, null));
		}
		req.exist=false;
		if (data!=undefined && data!='{}' && data!=''){
			var buf = JSON.parse(data);
			var lung_buf = buf.length;
			for (var i=0; i<lung_buf; i++)
				buffer.push(buf[i]);
			var lung = buffer.length;
			req.buffer=buffer;
			for (var i=0; i<lung; i++){
				if (buffer[i].maglia==req.body.maglia){
					if (buffer[i].pantalone==req.body.pantalone){
						if (buffer[i].scarpa==req.body.scarpa){
							if (buffer[i].occhiali==req.body.occhiali){
								req.exist=true;
								break;
							}
						}
					}
				}
			};
		}
		else{
			req.buffer= new Array();
			fs.unlinkSync(CONFIG);
		}
		next();
	});
};

engine.setConfig = function(req, res){
	if (req.exist==false){
		var buffer = new Array();
		buffer = req.buffer;
		buffer.push(req.body);
		fs.writeFile(CONFIG, JSON.stringify(buffer, null), function(err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
		res.send("ok");
	}
	else
		res.send("Configurazione gia' presente sul server");
};

engine.deleteConfig = function(req, res){
	fs.unlink(CONFIG, function(err){
		if (err){
			console.error(err);
		}
	});
	res.send("ok");
};

module.exports = engine;
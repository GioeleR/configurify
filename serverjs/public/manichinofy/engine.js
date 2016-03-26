var fs = require('fs');
var CONFIG = ('public/manichinofy/config/config.json');							//percorso file delle configurazioni

var engine = {};																//dichiarazione oggetto engine

engine.control = function(req, res, next){										//controlla la disponibilità del file
	var buffer = new Array();
	fs.readFile(CONFIG, function(err, data){									//legge dal file e gestisce l'eventuale errore
		if (err) {
			console.error(err);
			if (err.errno==-4058)												//se l'errore è -4058 il file non esiste e viene creato scrivendo all'interno '{}'
				fs.writeFileSync(CONFIG, JSON.stringify({}, null));
		}
		req.exist=false;
		if (data!=undefined && data!='{}' && data!=''){							//se i dati letti sono validi vengono organizzati in un vettore e copiato nella richiesta
			var buf = JSON.parse(data);
			var lung_buf = buf.length;
			for (var i=0; i<lung_buf; i++)
				buffer.push(buf[i]);
			var lung = buffer.length;
			req.buffer=buffer;
			for (var i=0; i<lung; i++){											//si controlla se la configurazione inviata esiste già nel file
				if (buffer[i].maglia==req.body.maglia){
					if (buffer[i].pantalone==req.body.pantalone){
						if (buffer[i].scarpa==req.body.scarpa){
							if (buffer[i].occhiali==req.body.occhiali){
								req.exist=true;									//se esiste exist viene impostato come vero
								break;
							}
						}
					}
				}
			};
		}
		else{																	//se i dati letti non sono validi il file viene eliminato per evitare futuri errori
			req.buffer= new Array();
			fs.unlinkSync(CONFIG);
		}
		next();																	//controllo al prossimo middleware
	});
};

engine.setConfig = function(req, res){											//scrive una nuova configurazione nel file (http put) se non esiste già altrimenti invia un mex
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

engine.deleteConfig = function(req, res){										//cancella il file dopo una richiesta http delete
	fs.unlink(CONFIG, function(err){
		if (err){
			console.error(err);
		}
	});
	res.send("ok");
};

module.exports = engine;
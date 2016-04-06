app.controller('myCtrl', ['$http', function($http){
	var self = this;
	$http.get("http://127.0.0.1:3000/angular/manichinofy/maglie.json").then(function (response) {
    	self.maglie = response.data.maglie;
	});
	$http.get("http://127.0.0.1:3000/angular/manichinofy/pantaloni.json").then(function (response) {
		self.pantaloni = response.data.pantaloni;
	});
	$http.get("http://127.0.0.1:3000/angular/manichinofy/scarpe.json").then(function (response) {
		self.scarpe = response.data.scarpe;
	});
	this.init = function (){
		this.manichino = "manichino.jpg";
		this.occhiale = "occhiali.png";
		this.braccioSx = "mano_sx.png";
		this.braccioDx = "mano_dx.png";
		this.maglia = "";
		this.pantalone = "";
		this.scarpa = "";
		this.showMaglia = false;		//non mostrare maglia
		this.showPant = false;			//non mostrare pantaloni
		this.showScarpa = false;		//non mostrare scarpe
		this.showOcchiali = false;		//non mostrare occhiali
		this.showOver = this.showPant || this.showMaglia;		//se è impostata una maglia o un pantalone modifica z-index delle braccia
		this.verdiOn = false;			//disattiva classe speciale per i pantaloni verdi
		this.sendButton = false;		//disattiva bottone invio config
		this.lungConfig = -1;			//lunghezza delle configurazioni scaricate dal server
	}
	this.setMaglia = function(x){		//modifica maglia
		this.maglia = x;
		this.showMaglia = true;
		this.showOver = this.showPant || this.showMaglia;
		this.setSendButton();			//controlla bottone invio config
	};
	this.setPantalone = function(x){	//modifica pantalone
		this.pantalone = x;
		this.showPant = true;
		if (x=="pantaloni_verdi.png")		//attiva class css speciale per i pantaloni verdi
			this.verdiOn = true;
		else this.verdiOn = false;
		this.showOver = this.showPant || this.showMaglia;		//mostra braccia sopra agli indumenti se è attiva una maglia o un pantalone
		this.setSendButton();			//controlla bottone invio config
	};
	this.setScarpe = function(x){		//modifica scarpa
		this.scarpa = x;
		this.showScarpa = true;
		this.setSendButton();			//controlla bottone invio config
	};
	this.setSendButton = function(){		//disabilita o attiva bottone invio config
		if (this.maglia=="" || this.pantalone=="" || this.scarpa=="")
			this.sendButton = false;		//disabilitato
		else
			this.sendButton = true;			//attivato
	};
	this.sendConfig = function (){			//invia configurazione attuale al server
		if (this.sendButton == false) return;
		var object = {"maglia": this.maglia, "pantalone": this.pantalone, "scarpa": this.scarpa, "occhiali": this.showOcchiali};
		var file = angular.toJson(object, true);
		$http.put("http://127.0.0.1:3000/angular/manichinofy/config", file).then(function (res){
			if (res.status==200)
				console.log('Put riuscita');
		}, function (res){				//in caso di errore stampa in console
			if (res.status==304)
				alert("Configurazione gia' presente sul server");
            console.log(res.status);
		});
		this.sendButton = false;			//disabilita bottone
	};
	this.getConfig = function(){			//richiede al server le configurazioni salvate
		$http.get("http://127.0.0.1:3000/angular/manichinofy/config").then(function (res){			//se il file esiste la richiesta ha successo ma...
			self.lungConfig=res.data.length;
			if (self.lungConfig!=0 && self.lungConfig!=undefined){			//vengono salvate le configurazioni ricevute ed impostata la prima sul manichino
				self.configs=res.data;
				self.setMaglia(res.data[0].maglia);
				self.setPantalone(res.data[0].pantalone);
				self.setScarpe(res.data[0].scarpa);
				self.showOcchiali = res.data[0].occhiali;
				self.selected=0;
			}
			else				//altrimenti se il file è vuoto
				alert("Nessuna configurazione presente sul server");
		}, function (res){				//se il file delle configurazioni non esiste il server restituisce 404
			if (res.status==404)
				alert("Nessuna configurazione presente sul server");
		});
	};
	this.next = function(){				//se sono state scaricate più configurazioni per mette di scorrerle e mostarle sul manichino in sequenza
		this.selected++;
		if (this.selected>=this.lungConfig)
			this.selected=0;
		this.setMaglia(this.configs[this.selected].maglia);
		this.setPantalone(this.configs[this.selected].pantalone);
		this.setScarpe(this.configs[this.selected].scarpa);
		this.showOcchiali = this.configs[this.selected].occhiali;
	};
	this.del = function(){				//elimina configurazioni dal server
		$http.delete("http://127.0.0.1:3000/angular/manichinofy/config").then(function (res){
			alert("Configurazioni salvate sul server eliminate correttamente");
		}, function(res){
			alert("Errore durante la richiesta");
		});
	};
	this.init();
}]);
app.controller('myCtrl', ['$http', '$scope', function($http, $scope){
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
		this.verdiOn = false;			//attiva classe speciale per i pantaloni verdi
		this.sendButton = false;		//attiva bottone invio config
		this.lungConfig = -1;
	}
	this.setMaglia = function(x){		//modifica maglia
		this.maglia = x;
		this.showMaglia = true;
		this.showOver = this.showPant || this.showMaglia;
		this.setSendButton();
	};
	this.setPantalone = function(x){	//modifica pantalone
		this.pantalone = x;
		this.showPant = true;
		if (x=="pantaloni_verdi.png")
			this.verdiOn = true;
		else this.verdiOn = false;
		this.showOver = this.showPant || this.showMaglia;
		this.setSendButton();
	};
	this.setScarpe = function(x){		//modifcia scarpa
		this.scarpa = x;
		this.showScarpa = true;
		this.setSendButton();
	};
	this.setSendButton = function(){		//disabilita o attiva bottone invio config
		if (this.maglia=="" || this.pantalone=="" || this.scarpa=="")
			this.sendButton = false;		//disabilitato
		else
			this.sendButton = true;			//attivato
	};
	this.sendConfig = function (){
		if (this.sendButton == false) return;
		var object = {"maglia": this.maglia, "pantalone": this.pantalone, "scarpa": this.scarpa, "occhiali": this.showOcchiali};
		var file = angular.toJson(object, true);
		$http.put("http://127.0.0.1:3000/angular/manichinofy/config", file).then(function (res){
			if (res.data=='ok')
				console.log('Put riuscita');
			else
				alert(res.data);
		}, function (res){
			console.log(res.status);
		});
		this.sendButton = false;
	};
	this.getConfig = function(){
		$http.get("http://127.0.0.1:3000/angular/manichinofy/config").then(function (res){
			self.lungConfig=res.data.length;
			if (self.lungConfig!=0 && self.lungConfig!=undefined){
				self.configs=res.data;
				self.setMaglia(res.data[0].maglia);
				self.setPantalone(res.data[0].pantalone);
				self.setScarpe(res.data[0].scarpa);
				self.showOcchiali = res.data[0].occhiali;
				self.selected=0;
			}
			else
				alert("Nessuna configurazione presente sul server");
		}, function (res){
			if (res.status==404)
				alert("Nessuna configurazione presente sul server");
		});
	};
	this.next = function(){
		this.selected++;
		if (this.selected>=this.lungConfig)
			this.selected=0;
		this.setMaglia(this.configs[this.selected].maglia);
		this.setPantalone(this.configs[this.selected].pantalone);
		this.setScarpe(this.configs[this.selected].scarpa);
		this.showOcchiali = this.configs[this.selected].occhiali;
	};
	this.del = function(){
		$http.delete("http://127.0.0.1:3000/angular/manichinofy/config").then(function (res){
			alert("Configurazioni salvate sul server eliminate correttamente");
		}, function(res){
			alert("Errore durante la richiesta");
		});
	};
	this.init();	
}]);
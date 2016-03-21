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
		var object = {"maglia": this.maglia, "pantalone": this.pantalone, "scarpa": this.scarpa, "occhiali": this.showOcchiali};
		var file = angular.toJson(object, true);
		$http.put("http://127.0.0.1:3000/angular/manichinofy/config", file).then(function (res){
			if (res.data=='ok')
				console.log('Put riuscita');
		}, function (res){
			console.log(res.status);
		});
	};
	this.getConfig = function(){
		$http.get("http://127.0.0.1:3000/angular/manichinofy/config").then(function (res){
			self.setMaglia(res.data.maglia);
			self.setPantalone(res.data.pantalone);
			self.setScarpe(res.data.scarpa);
			self.showOcchiali = res.data.occhiali;
		});
	};
	this.init();	
}]);
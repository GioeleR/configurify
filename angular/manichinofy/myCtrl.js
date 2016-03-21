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
		this.showMaglia = false;		
		this.showPant = false;		
		this.showScarpa = false;		
		this.showOcchiali = false;
		this.showOver = this.showPant || this.showMaglia;
		this.verdiOn = false;
	}
	this.setMaglia = function(x){
		this.maglia = x;
		this.showMaglia = true;
		this.showOver = this.showPant || this.showMaglia;
	};
	this.setPantalone = function(x){
		this.pantalone = x;
		this.showPant = true;
		if (x=="pantaloni_verdi.png")
			this.verdiOn = true;
		else this.verdiOn = false;
		this.showOver = this.showPant || this.showMaglia;
	};
	this.setScarpe = function(x){
		this.scarpa = x;
		this.showScarpa = true;
	};
	this.inviaConfig = function (){
		var object = {"maglia": this.maglia, "pantaloni": this.pantalone, "scarpe": this.scarpa, "occhiali": this.showOcchiali};
		var json = angular.toJson(object, true);
		alert(json);
		$http.put("http://127.0.0.1:3000/angular/manichinofy/config/config.json", json).then(function (){});
	}
	this.init();	
}]);
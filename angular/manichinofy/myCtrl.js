app.controller('myCtrl', ['$http', '$scope', function($http, $scope){
	/*this.maglie = [{desc: "Maglia Nera", img: "maglia_nera.png"}, {desc: "Superman", img: "superman.png"}, {desc: "Maglia a Righe", img: "maglia_a_righe.png"}, {desc: "Maglia Verde", img: "maglia_verde.png"}];
	this.pantaloni = [{desc: "Pantaloni Beige", img: "pantaloni_beige.png"}, {desc: "Pantaloni Neri", img: "pantaloni_neri.png"}, {desc: "Pantaloni Verdi", img: "pantaloni_verdi.png"}, {desc: "Pantaloni da Elicotterista", img: "pantaloni_elicotterista.png"}, {desc: "Pantaloni Shorts", img: "pantaloni_shorts.png"}];
	this.scarpe = [{desc: "Scarpe Grigie", img: "scarpe_grigie.png"}, {desc: "Scarpe Eleganti", img: "scarpe_eleganti.png"}];
	*/
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
	/*$http.get("\maglie.json").then(function (response) {
    	self.maglie = response.data.maglie;
	});
	$http.get("\pantaloni.json").then(function (response) {
		self.pantaloni = response.data.pantaloni;
	});
	$http.get("\scarpe.json").then(function (response) {
		self.scarpe = response.data.scarpe;
	});*/
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
		/*var config = new Array(4);
		config[0] = this.maglia;
		config[1] = this.pantalone;
		config[2] = this.scarpa;
		config[3] = this.showOcchiali;
		alert(config[0]);
		alert(config[1]);
		alert(config[2]);
		alert(config[3]);*/
		var object = {"maglia": this.maglia, "pantaloni": this.pantalone, "scarpe": this.scarpa, "occhiali": this.showOcchiali};
		var json = angular.toJson(object, true);
		alert(json);
		$http.put("\config.json", json).then(function (){});
	}
	this.init();	
}]);
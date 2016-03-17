app.controller('myCtrl', ['$http', function($http){
	this.maglie = [{desc: "Maglia Nera", img: "maglia_nera.png"}, {desc: "Superman", img: "superman.png"}, {desc: "Maglia a Righe", img: "maglia_a_righe.png"}, {desc: "Maglia Verde", img: "maglia_verde.png"}];
	this.pantaloni = [{desc: "Pantaloni Beige", img: "pantaloni_beige.png"}, {desc: "Pantaloni Neri", img: "pantaloni_neri.png"}, {desc: "Pantaloni Verdi", img: "pantaloni_verdi.png"}, {desc: "Pantaloni da Elicotterista", img: "pantaloni_elicotterista.png"}, {desc: "Pantaloni Shorts", img: "pantaloni_shorts.png"}];
	this.scarpe = [{desc: "Scarpe Grigie", img: "scarpe_grigie.png"}, {desc: "Scarpe Eleganti", img: "scarpe_eleganti.png"}];
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
	this.a = function (x){
		alert(x);
	}
	this.init();	
}]);
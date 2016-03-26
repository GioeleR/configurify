app.controller('myCtrl', ['$http', function($http){
	this.piloti = [{"nome": "Dovizioso", "img": "Dovizioso.jpg", "testa": "dov_testa.png", "corpo": "dov_corpo.png"},
				{"nome": "Rossi", "img": "Rossi.jpg", "testa": "ros_testa.png", "corpo": "ros_corpo.png"},
				{"nome": "Lorenzo", "img": "Lorenzo.jpg", "testa": "lor_testa.png", "corpo": "lor_corpo.png"},
				{"nome": "Marquez", "img": "Marquez.jpg", "testa": "mar_testa.png", "corpo": "mar_corpo.png"}];
	this.pilota1 = "";
	this.pilota2 = "";
	this.testa = "";
	this.corpo = "";
	this.base = "";
	this.fusione = function(pilota1, pilota2, pilota3){
		this.testa = pilota1.testa;
		this.corpo = pilota2.corpo;
		this.base = pilota3.img;
	};
}]);
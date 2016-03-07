var app = angular.module('myApp', []);

app.directive('imgPiloti', function(){
	return {
		restrict: 'E',
		templateUrl: 'images.html'
	}
});

app.directive('imgFusione', function(){
	return {
		restrict:'E',
		templateUrl: 'fusione.html'
	}
});
appoie.service('mapService', ['$http', function ($http) {
    
	this.getMarkers = function ()
	{
		return $http.get('publicacao/marcadores');
	},

	this.getIcons = function ()
	{
<<<<<<< HEAD
		return $http.get('publicacao/icones');
=======
		return $http.get('publicacao/icone');
>>>>>>> #7579
	}

	this.getPostMin = function (id) {
		return $http.get('publicacao/previa/' + id);
	}
}]);
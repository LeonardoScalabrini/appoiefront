appoie.service('mapService', ['$http', function ($http) {
    
	this.getMarkers = function ()
	{
		return $http.get('publicacao/marcadores');
	},

	this.getIcons = function ()
	{
		return $http.get('publicacao/icone');
	}

	this.getPostMin = function (id) {
		return $http.get('publicacao/previa/' + id);
	}
}]);
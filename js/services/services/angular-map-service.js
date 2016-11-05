appoie.service('mapService', ['$http', function ($http) {
    
    this.notificar = function ()
	{
		return $http.get('notificar');
	}
    
	this.getMarkers = function ()
	{
		return $http.get('publicacao/marcadores');
	}

	this.getIcons = function ()
	{
		return $http.get('publicacao/icones');
	}

	this.getPostMin = function (id) 
	{
		return $http.get('publicacao/previa/' + id);
	}
	
	this.apoiar = function (id) 
	{
		return $http.post('publicacao/apoiar/' + id);
	}
	
	this.desapoiar = function (id) 
	{
		return $http.post('publicacao/desapoiar/' + id);
	}

}]);
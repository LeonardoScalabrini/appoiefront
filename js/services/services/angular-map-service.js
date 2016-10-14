appoie.service('mapService', ['$http', function ($http) {

    this.apoiar = function (idPublicacao) {
    	return $http.post('publicacao/apoiar/' + idPublicacao);

    }	
    
    this.notificar = function ()

	{
		return $http.get('notificar');
	}
    
	this.getMarkers = function ()

	{
		return $http.get('publicacao/marcadores');
	},

	this.getIcons = function ()
	{
		return $http.get('publicacao/icones');
	}

	this.getPostMin = function (id) {
		return $http.get('publicacao/previa/' + id);
	}

}]);
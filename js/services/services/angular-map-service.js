appoie.service('mapService', ['$http', function ($http) {

    this.apoiar = function (idPublicacao) {
    	return $http.post('publicacao/apoiar/' + idPublicacao);

    }	


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
		return $http.get('publicacao/icones');
	}

	this.getPostMin = function (id) {
		return $http.get('publicacao/previa/' + id);
	}

}]);
appoie.service('menuService', ['$http', function ($http) {
	this.filtrarPorData = function(filtro) {
		return $http.post("publicacao/marcadores/data", filtro);

	}

	this.filtrarPorCategoria = function(filtro) {
		return $http.post("publicacao/marcadores/categoria", filtro);

	}

	this.filtrarPorTipo = function(filtro) {
		return $http.post("publicacao/marcadores/tipo", filtro);

	}
	
	
}])
appoie.service('menuService', ['$http', function ($http) {
	this.filtrar = function(filtro) {
		return $http.post("publicacao/marcadores/filtrar", filtro);

	}

	
	
}])
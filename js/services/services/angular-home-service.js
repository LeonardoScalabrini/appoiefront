application.service('homeService', ['$http', function ($http) {

	this.buscarCategorias = function ()
	{
		return $http.get("/publicacao/categorias");
	};
	
}]);
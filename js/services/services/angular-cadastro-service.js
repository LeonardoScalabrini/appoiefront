application.service('cadastroService', ['$http', function ($http) {

	this.salvar = function (usuario)
	{
		return $http.post("/usuario", usuario);
	};
	
}]);
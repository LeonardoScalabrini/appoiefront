appoie.service('cadastroService', ['$http', function ($http) {
	
	this.salvar = function (usuario)
	{
		return $http.post("/usuario", usuario);
	};

	this.buscarCep = function (cep)
	{
		return $http.get("http://api.postmon.com.br/v1/cep/" + cep);
	};
	
}]);
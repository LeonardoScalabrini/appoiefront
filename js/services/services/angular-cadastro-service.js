appoie.service('cadastroService', ['$http', function ($http) {
	
	this.salvar = function (usuario)
	{
		$http.post("/usuario", usuario).then(function (response) {
			return true;
		}, function (response) {
			return false;
		})
	};

	this.buscarCep = function (cep)
	{
		return $http.get("http://api.postmon.com.br/v1/cep/" + cep);
	};
	
}]);
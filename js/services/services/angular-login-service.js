application.service('loginService', ['$http', function ($http) {

	this.logar = function (usuario)
	{
		return $http.post("/usuario/login", usuario);
	};

	this.recuperarSenha = function ()
	{
		// Requisição para recuperação de senha.
	};
	
}]);
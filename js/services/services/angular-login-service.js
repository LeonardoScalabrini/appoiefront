appoie.service('loginService', ['$http', function ($http) {

	this.logar = function (usuario)
	{
		return $http.post("/usuario/auth", usuario);
	};

	this.recuperarSenha = function ()
	{
		// Requisição para recuperação de senha.
	};
	
}]);
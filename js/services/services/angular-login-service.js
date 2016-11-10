appoie.service('loginService', ['$http', function ($http) {

	this.logar = function (login)
	{
		return $http.post("/usuario/auth", login);
	};

	this.recuperarSenha = function ()
	{
		// Requisição para recuperação de senha.
	};
	this.salvarUsuarioFacebook = function (usuario)
	{
		return $http.post("/usuarioFacebook/salvar", usuario);
	};

}]);

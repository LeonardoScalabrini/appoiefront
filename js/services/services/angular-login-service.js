appoie.service('loginService', ['$http', function ($http) {

	this.logar = function (login)
	{
		return $http.post("/usuario/auth", login);
	};

	this.recuperarSenha = function (obj)
	{
		return $http.post("/usuario/recuperarSenha", obj);
	};

	this.salvarUsuarioFacebook = function (usuario)
	{
		return $http.post("/usuarioFacebook/salvar", usuario);
	};

}]);

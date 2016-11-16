appoie.service('loginService', ['$http', function ($http) {

	var vazio = {};
	vazio.email = '';
	vazio.senha = '';
	
	this.logar = function (login)
	{	
		if(login == undefined){
			return $http.post("/usuario/auth", vazio); 
		}
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

application.controller('loginController', ['$scope', 'loginService', 'mensagemFactory', function ($scope, loginService, mensagemFactory) {

	$scope.logar = function (usuario)
	{
		loginService.logar(usuario).then(function ()
		{
			// Capturar token do backend
			window.location.href = "#/home";
		},
		function ()
		{
			propriedades = {
				titulo: "Ooops!",
				mensagem: "Login ou senha inválido!"
			};

			mensagemFactory.erro(propriedades);
		});
	}
	
}]);
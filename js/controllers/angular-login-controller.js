application.controller('loginController', ['$scope', 'loginService', 'mensagemFactory', function ($scope, loginService, mensagemFactory) {

	$scope.senhaPerdida = false;
	$scope.modalTitle = "Entre com sua conta";

	$scope.recuperarSenha = function ()
	{
		$scope.senhaPerdida = !$scope.senhaPerdida;
		$scope.modalTitle = (!$scope.senhaPerdida) ? "Entre com sua conta" : "Redefina sua senha";
	};

	$scope.enviar = function (email)
	{
		// Retorno da requisição de recuperação de senha.

		$scope.recuperarSenha();
	};

	$scope.logar = function (usuario)
	{
		loginService.logar(usuario).then(function (response)
		{
			// Capturar token do backend
			window.location.href = "#/home";
		},
		function (response)
		{
			propriedades = { titulo: "Ooops!", mensagem: response.data.message};
			mensagemFactory.erro(propriedades);
		});
	};
	
}]);
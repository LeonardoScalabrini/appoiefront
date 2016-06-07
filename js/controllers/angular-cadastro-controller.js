application.controller('cadastroController', ['$scope', 'cadastroService', 'mensagemFactory', '$filter', function ($scope, cadastroService, mensagemFactory, $filter) {

	var propriedades = {};
	
	$scope.cadastrar = function (usuario)
	{	
		if ($scope.cadastro.$invalid)
		{	
			propriedades = {
				titulo: "Ooops!",
				mensagem: "Preencha todos os campos corretamente!"
			};

			mensagemFactory.erro(propriedades);

			angular.forEach($scope.cadastro, function (value, key) 
			{
				if (typeof value === "object" && value.$invalid)
					value.$setDirty();
			});
		}
		else
		{
			cadastroService.salvar(usuario).then(function () 
			{
				$scope.limparCampos();
				$('.close h1').click();
				
				propriedades = {
					titulo: "Concluído!",
					mensagem: "Um email foi enviado para confirmação! \n Por favor confira sua caixa de entrada."
				};

				mensagemFactory.sucesso(propriedades);
			},
			function (response) 
			{
				propriedades = {
					titulo: "Ooops!",
					mensagem: response.data.message
				};

				mensagemFactory.erro(propriedades);
			});
		}
	};

	$scope.limparCampos = function ()
	{
		delete $scope.usuario;
		delete $scope.confirmaEmail;
		delete $scope.confirmaSenha;
		$scope.cadastro.$setPristine();
		$('.error-message').addClass('hide');
	}

}]);
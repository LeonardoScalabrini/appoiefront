application.controller('manterPerfilController', ['$scope', 'manterPerfilService', function ($scope) {

	$('#tabs').tab();

	$scope.Email = true;
	$scope.senhaSelecionado = true;
	 
	$scope.MostraFormSenha = function(){

	 	if( $scope.Senha = true ){
	 		
	 		$scope.Email = true;

	 		$scope.Senha = !$scope.Senha;
	 	}

	 	$scope.senhaSelecionado = true;
	 	$scope.emailSelecionado = false;

	}

	$scope.MostraFormEmail = function(){

	 	if( $scope.Email = true){
	 		$scope.Senha = true;

	 		$scope.Email = !$scope.Email;

		}

		$scope.senhaSelecionado = false;
	 	$scope.emailSelecionado = true;
	}

}]);
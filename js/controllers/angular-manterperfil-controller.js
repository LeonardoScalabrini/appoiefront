application.controller('manterPerfilController', ['$scope', function ($scope) {

	$('#tabs').tab();

	$scope.Email = true;

	 
	$scope.MostraFormSenha = function(){

	 	if( $scope.Senha = true ){
	 		
	 		$scope.Email = true;

	 		$scope.Senha = !$scope.Senha;
	 	}

	}

	$scope.MostraFormEmail = function(){

	 	if( $scope.Email = true){
	 		$scope.Senha = true;

	 		$scope.Email = !$scope.Email;

		}
	}

}]);
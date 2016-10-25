appoie.controller('loginController', ['$scope','$facebook','loginService', 'mensagemFactory', function ($scope,$facebook, loginService, mensagemFactory) {

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
		if (!usuario) usuario = {};

		loginService.logar(usuario).then(function (response)
		{
			// Capturar token do backend
			window.location.href = "#/home";
		},
		function (response)
		{
			propriedades = { titulo: "Ooops!", mensagem: response.data.message };
			mensagemFactory.erro(propriedades);
		});
	};

	/* $scope.$on('fb.auth.authResponseChange', function() {
	      $scope.status = $facebook.isConnected();
	      if($scope.status) {
	        $facebook.api('/me').then(function(user) {
	          $scope.user = user;
	        });
	      }
	    });

	    $scope.loginFacebook = function() {
	      if($scope.status) {
	        $facebook.logout();
	      } else {
	        $facebook.login();
	      }
	    };

	    $scope.getFriends = function() {
	      if(!$scope.status) return;
	      $facebook.cachedApi('/me/friends').then(function(friends) {
	        $scope.friends = friends.data;
	      });
	    }*/

}]);

application.service('manterPerfilService', ['$http', function ($http) {

	this.salvarNovoPerfil = function (novoPerfil)
	{
		return $http.put("/perfil", novoPerfil);
	};
	
}]);
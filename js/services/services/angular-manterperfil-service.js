application.service('manterPerfilService', ['$http', function ($http) {

	debugger;
	this.salvarNovoPerfil = function (novoPerfil)
	{
		return $http.put("/perfil", novoPerfil);
	};
	
}]);
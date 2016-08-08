application.service('userService', ['$http', function ($http) {

	this.buscarInfoUsuario = function ()
	{
		return $http.get("/usuario/info");
	}
	
}]);
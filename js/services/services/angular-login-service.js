application.service('loginService', ['$http', function ($http) {

	this.logar = function (usuario)
	{
		return $http.post("/login", usuario);
	};
	
}]);
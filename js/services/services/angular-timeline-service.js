application.service('timelineService', ['$http', function ($http) {

	this.publicar = function (post)
	{
		return $http.post("/publicacao/salvar", post);
	};
	
}])
appoie.service('mapService', ['$http', function ($http) {

	this.getPosts = function ()
	{
		return $http.get('publicacao/marcadores');
	},

	this.getIcons = function ()
	{
		return $http.get('publicacao/icones');
	}
	
}]);
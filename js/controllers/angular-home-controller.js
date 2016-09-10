appoie.controller('homeController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

	$scope.toggleLeft = function () 
	{
		menuFactory.buildToggler('left');
	};
	
}]);
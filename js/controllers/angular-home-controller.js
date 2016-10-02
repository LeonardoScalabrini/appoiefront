appoie.controller('homeController', ['$scope', 'menuFactory', '$mdDialog', function ($scope, menuFactory, $mdDialog) {

	$scope.toggleLeft = function () 
	{
		menuFactory.buildToggler('left');
	};
	
}]);
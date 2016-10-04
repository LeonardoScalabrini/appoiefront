appoie.factory('menuFactory', ['$mdSidenav', '$timeout', function ($mdSidenav, $timeout) {

	return {

		buildToggler: function (componentId)
		{
			return $mdSidenav(componentId).toggle();
		}
	}

}]);
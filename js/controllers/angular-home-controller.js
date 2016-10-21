appoie.controller('homeController', ['$scope', 'menuFactory', '$mdDialog', function ($scope, menuFactory, $mdDialog) {

	$scope.toggleLeft = function () 
	{
		menuFactory.buildToggler('left');
	};

	var originatorEv;

    this.menuHref = "http://www.google.com/design/spec/components/menus.html#menus-specs";

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    this.announceClick = function(index) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('You clicked!')
          .textContent('You clicked the menu item at index ' + index)
          .ok('Nice')
          .targetEvent(originatorEv)
      );
      originatorEv = null;
    };

  $('.input-search').focus(function(event) {
    $(this).removeAttr('placeholder');
    $(this).removeClass('material-icons');
  });

  $('.input-search').blur(function(event) {
    $(this).addClass('material-icons');
    $(this).attr('placeholder', 'search');
  });
	
}]);
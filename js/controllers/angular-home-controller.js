application.controller('homeController', ['$scope', function ($scope) {

	var menuActive = false;

	$(".iconeMenu, #block").click(function(e) {

		menuActive = !menuActive;

        if (menuActive)
	    {
	    	$("#block").fadeIn('fast', function () {
	    		$(this).removeClass('hide');
	    	});
	    	$("#wrapper").toggleClass("toggled");
	    }
	    else
	    {
	    	$("#wrapper").toggleClass("toggled");
	    	$("#block").fadeOut('fast', function () {
	    		$(this).addClass('hide');
	    	});
	    }

    });

    

}]);
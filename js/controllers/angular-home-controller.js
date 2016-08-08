application.controller('homeController', ['$scope', 'homeService', 'userService', function ($scope, homeService, userService) {

	var menuActive = false;

	$(".iconeMenu, .iconeMenuEsconde, #block").click(function(e) {

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

	$(".list-group-item").on('click', function(event) {

		if ($(this).hasClass('item-checked'))
		{
			$(this).removeClass('item-checked');
			$(this).find("span").remove();
		}
		else
		{
			$(this).addClass('item-checked');
			$(this).find("p").after("<span><img src='../img/checked.png' height='20' width='20'></span>");
		}

	});

	$(".img-user-logged").on('click', function(event) {
		
		if ($("#info-user-action").hasClass('hide'))
			$("#info-user-action").removeClass('hide');
		else
			$("#info-user-action").addClass('hide');
	});

	$scope.categorias = [];

	homeService.buscarCategorias().then(function (response) {

		$scope.categorias = response.data;

	}, function (e) {

	});
	
}]);
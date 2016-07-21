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


	$('#tabs').tab();

	 $scope.Email = true;

	 
	 $scope.MostraFormSenha = function(){

	 	if( $scope.Senha = true ){
	 		
	 		$scope.Email = true;

	 		$scope.Senha = !$scope.Senha;
	 	}

	 }

	$scope.MostraFormEmail = function(){

	 	if( $scope.Email = true){
	 		$scope.Senha = true;

	 		$scope.Email = !$scope.Email;

		}
	}

	// $scope.teste = function(){
	// 	alert("Saindo...")
	// }

}]);
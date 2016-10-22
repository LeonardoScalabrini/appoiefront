appoie.controller('menuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

	$scope.tipoCategoria = {};

	$scope.toggleLeft = function () 
	{
		menuFactory.buildToggler('left');
	};

	$scope.filtros = [
	    { nome: 'Abertos', wanted: false },
	    { nome: 'Fechados', wanted: false },
	    { nome: 'Minhas publicações', wanted: false }
	];

	$('.span').on('click', function(event) {

		if ($(this).next().hasClass('hide') && $(this).children().html() == 'add')
		{
			$(this).children().html('remove');
			$(this).next().slideToggle();
			$(this).next().removeClass('hide');
		}
		else
		{
			$(this).children().html('add');
			$(this).next().slideToggle();
			$(this).next().addClass('hide');
		}
		
	});

	$('.img-select').on('click', function(event) {

		if ($(this).hasClass('img-disabled'))
			$(this).removeClass('img-disabled');
		else
			$(this).addClass('img-disabled');

		console.log($(this).attr("alt"));

	});


}]);
appoie.controller('menuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

	$scope.tipoCategoria = {};

	$scope.toggleLeft = function () 
	{
		menuFactory.buildToggler('left');
	};

	$scope.filtros = [
	    { nome: 'Abertos', wanted: false },
	    { nome: 'Fechados', wanted: false },
	    { nome: 'Minhas publicações', wanted: false },
	    { nome: '10 mais apoiados', wanted: false }
	];

	$scope.categorias = menuFactory.categorias();

	$('.span').on('click', function(event) {

		if ($(this).next().hasClass('hide'))
		{
			$(this).next().slideToggle();
			$(this).next().removeClass('hide');
		}
		else
		{
			$(this).next().slideToggle();
			$(this).next().addClass('hide');
		}
		
	});

	$scope.selecionarCategoria = function (element)
	{
		
	}

}]);
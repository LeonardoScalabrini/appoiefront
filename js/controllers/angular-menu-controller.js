appoie.controller('menuController', ['$scope', 'menuFactory', 'menuService', '$rootScope', 'markerService', 'menuFactory', function ($scope, menuFactory, menuService, $rootScope, markerService, menuFactory) {

	$scope.categorias = [];
	$scope.filtroData = {};
	$scope.filtroCategoria = {};
	$scope.filtroTipo = {};
	$scope.marcadoresRecuperados = [];

	

	$scope.toggleLeft = function () 
	{
		menuFactory.buildToggler('left');
	};

	$scope.menuFiltros = [
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

		if ($(this).hasClass('img-disabled')) {
			$(this).removeClass('img-disabled');
			adicionaCategoria($(this).attr("alt"));
		}
		else {
			$(this).addClass('img-disabled');
			removeCategoria($(this).attr("alt"));
		}	

	});

	$scope.filtrarPorTipo = function() {
		$scope.filtroTipo = {};
		var tipos = [];

		$scope.filtroTipo.filtrarMinhasPublicacoes = false;
		$scope.menuFiltros.forEach(function(obj) {
			if(obj.wanted) {
				switch(obj.nome) {
					case "Abertos": tipos.push("ABERTO");
					break;
					
					case "Fechados": tipos.push("FECHADO");
					break;
					
					case "Minhas publicações": $scope.filtroTipo.filtrarMinhasPublicacoes = true;
					break;					
				}
				
			}

		});
		$scope.filtroTipo.situacoes = tipos;
		
		menuService.filtrarPorTipo($scope.filtroTipo).then(function(response) {
			$scope.marcadoresRecuperados = response.data;
			markerService.clearMarker();
			markerService.initMarkers($scope.marcadoresRecuperados);
			$scope.fecharMenu();		

		}, function(response) {

		})		
	}

	$scope.filtrarPorData = function() {

		menuService.filtrarPorData($scope.filtroData).then(function(response) {
			$scope.marcadoresRecuperados = response.data;
			markerService.clearMarker();
			markerService.initMarkers($scope.marcadoresRecuperados);
			$scope.fecharMenu();		

		}, function(response) {

		})		
	}

	$scope.filtrarPorCategoria = function() {
		
		menuService.filtrarPorCategoria($scope.filtroCategoria).then(function(response) {
			$scope.marcadoresRecuperados = response.data;
			markerService.clearMarker();
			markerService.initMarkers($scope.marcadoresRecuperados);
			$scope.fecharMenu();		

		}, function(response) {

		})		
	}

	adicionaCategoria = function(categoria) {
		var itemExiste = false;
		for (var i = 0; i < $scope.categorias.length; i++) {
			if($scope.categorias[i] == categoria) itemExiste = true;
		}

		if(!itemExiste) {
			$scope.categorias.push(categoria);
		    $scope.filtroCategoria.categorias = $scope.categorias;			    
		}
	}

	removeCategoria = function(categoria) {
		var index;

		for (var i = 0; i < $scope.categorias.length; i++) {
			if($scope.categorias[i] == categoria) {
				index = $scope.categorias.indexOf(categoria);								
				if(index > -1) {
					$scope.categorias.splice(index, 1);
				} 				
			} 
		}
	}

<<<<<<< HEAD
=======
	$scope.fecharMenu = function() {
		menuFactory.buildToggler("left");
	}

>>>>>>> develop
}]);
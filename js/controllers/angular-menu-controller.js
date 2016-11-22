appoie.controller('menuController', ['$scope', 'menuFactory', 'menuService', '$rootScope', 'markerService', 'menuFactory', '$location', '$localStorage', function ($scope, menuFactory, menuService, $rootScope, markerService, menuFactory, $location, $localStorage) {

	$scope.ROOT  = $localStorage.user;
	
	$scope.marcadoresRecuperados = [];
	
	$scope.filtro = {
		dataInicio: null,
		dataFim: null,
		situacoes: ["ABERTO"],
		categorias: ["ARBORIZACAO", "DEFESACIVIL", "FUNDODEVALE", "ILUMINACAO",
	"PAVIMENTACAO", "SANEAMENTOBASICO", "SEGURANCA", "TERRENOBALDIO", "TRANSPORTEPUBLICO"],
		filtrarMinhasPublicacoes: true

	}
	
	$scope.toggleLeft = function () 
	{
		menuFactory.buildToggler('left');
	};

	$scope.menuFiltros = [
	    { nome: 'Abertos', wanted: true },
	    { nome: 'Fechados', wanted: false },
	    { nome: 'Minhas publicações', wanted: false }
	];

	$('.filter').on('click', function(event) {

		if ($(this).next().hasClass('hide') && $(this).children().children().html() == 'add')
		{
			$(this).children().children().html('remove');
			$(this).removeClass('border-bottom-menu');
			$(this).next().addClass('border-bottom-menu');
			$(this).next().fadeToggle('fast', function () {
				$(this).removeClass('hide');
				$(this).addClass('show');
			});
		}
		else
		{
			$(this).children().children().html('add');
			$(this).next().removeClass('border-bottom-menu');
			$(this).addClass('border-bottom-menu');
			$(this).next().fadeToggle('fast', function () {
				$(this).addClass('hide');
				$(this).removeClass('show');
			});
		}
		
	});

	$('.filter, .filter-config').hover(function() {

		$(this).find('.span').addClass('color-list-menu');
		$(this).find('.span').children().addClass('color-list-menu');
		
	}, function() {

		$(this).find('.span').removeClass('color-list-menu');
		$(this).find('.span').children().removeClass('color-list-menu');
		
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

	$scope.filtrar= function() {
		$scope.filtro.situacoes = [];
		var tipos = [];

		$scope.filtro.filtrarMinhasPublicacoes = false;
		$scope.menuFiltros.forEach(function(obj) {
			if(obj.wanted) {
				switch(obj.nome) {
					case "Abertos": tipos.push("ABERTO");
					break;
					
					case "Fechados": tipos.push("FECHADO");
					break;
					
					case "Minhas publicações": $scope.filtro.filtrarMinhasPublicacoes = true;
					break;					
				}
				
			}

		});
		$scope.filtro.situacoes = tipos;
		$scope.filtro.situacoes.length = tipos.length;

		menuService.filtrar($scope.filtro).then(function(response) {
			$scope.marcadoresRecuperados = response.data;
			markerService.clearMarker();
			markerService.initMarkers($scope.marcadoresRecuperados);
			$scope.fecharMenu();		

		}, function(response) {

		})		
	}

	adicionaCategoria = function(categoria) {
		var itemExiste = false;
		for (var i = 0; i < $scope.filtro.categorias.length; i++) {
			if($scope.filtro.categorias[i] == categoria) itemExiste = true;
		}

		if(!itemExiste) {
			$scope.filtro.categorias.push(categoria);
		    
		}
	}

	removeCategoria = function(categoria) {
		var index;

		for (var i = 0; i < $scope.filtro.categorias.length; i++) {
			if($scope.filtro.categorias[i] == categoria) {
				index = $scope.filtro.categorias.indexOf(categoria);								
				if(index > -1) {
					$scope.filtro.categorias.splice(index, 1);
				} 				
			} 
		}		
	}

	$scope.fecharMenu = function() {
		menuFactory.buildToggler("left");
	}

	$scope.logout = function() {
		$localStorage.$reset();
		$location.path("/login");
	}

	$scope.viewPerfil = function ()
	{
	    window.location.href = "#/perfil";
	}

}]);
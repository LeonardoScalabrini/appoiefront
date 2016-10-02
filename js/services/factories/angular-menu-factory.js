appoie.factory('menuFactory', ['$mdSidenav', '$timeout', function ($mdSidenav, $timeout) {

	return {

		buildToggler: function (componentId)
		{
			return $mdSidenav(componentId).toggle();
		},
		
		categorias: function ()
		{
			return [
				[
					{url: '/img/categorias/ARBORIZACAO.png'},
					{url: '/img/categorias/DEFESACIVIL.png'},
					{url: '/img/categorias/FUNDODEVALE.png'}
				],
				[
					{url: '/img/categorias/ILUMINACAO.png'},
					{url: '/img/categorias/PAVIMENTACAO.png'},
					{url: '/img/categorias/SANEAMENTOBASICO.png'}
				],
				[
					{url: '/img/categorias/SEGURANCA.png'},
					{url: '/img/categorias/TERRENOBALDIO.png'},
					{url: '/img/categorias/TRANSPORTEPUBLICO.png'}
				]
			]
		}
	}

}]);
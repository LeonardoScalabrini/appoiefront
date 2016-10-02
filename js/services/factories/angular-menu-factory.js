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
					{url: '/img/categorias/ARBORIZACAO.png', name: 'ARBORIZACAO'},
					{url: '/img/categorias/DEFESACIVIL.png', name: 'DEFESACIVIL'},
					{url: '/img/categorias/FUNDODEVALE.png', name: 'FUNDODEVALE'}
				],
				[
					{url: '/img/categorias/ILUMINACAO.png', name: 'ILUMINACAO'},
					{url: '/img/categorias/PAVIMENTACAO.png', name: 'PAVIMENTACAO'},
					{url: '/img/categorias/SANEAMENTOBASICO.png', name: 'SANEAMENTOBASICO'}
				],
				[
					{url: '/img/categorias/SEGURANCA.png', name: 'SEGURANCA'},
					{url: '/img/categorias/TERRENOBALDIO.png', name: 'TERRENOBALDIO'},
					{url: '/img/categorias/TRANSPORTEPUBLICO.png', name: 'TRANSPORTEPUBLICO'}
				]
			]
		}
	}

}]);
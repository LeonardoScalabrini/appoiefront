appoie.config(function ($stateProvider, $urlRouterProvider, $mdIconProvider) {

	$mdIconProvider
    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
    .defaultIconSet('img/icons/sets/core-icons.svg', 24);

	$urlRouterProvider.otherwise("/login");

	$stateProvider

	.state("login", {
		url: "/login",
		templateUrl: "views/login.html",
		controller: "indexController"
	})

	.state("home", {
		url: "/home",
		controller: "homeController",
		views: 
		{
			'': {templateUrl: "views/home.html"},
			'system-pages@home': {
				templateUrl: "views/main.html",
				controller: 'mapController'
			}
		}
	})

	.state("perfil", {
		url: "/perfil",
		controller: "perfilController",
		views: 
		{
			'': {templateUrl: "views/home.html"},
			'system-pages@perfil': {
				templateUrl: "views/perfil.html",
				controller: 'perfilController'
			}
		}
	});
	
});
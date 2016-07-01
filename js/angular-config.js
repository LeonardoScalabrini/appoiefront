application.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/entrar");

	$stateProvider

	.state("login", {
		url: "/entrar",
		templateUrl: "views/login.html"
	})

	.state("home", {
		url: "/home",
		views: 
		{
			'': {templateUrl: "views/home.html"},
			'system-pages@home': {templateUrl: "views/main.html"}
		}
	})
	
});
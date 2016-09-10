appoie.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider) {

	uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAq9rPjn3joaV_g7XxMeLihEiV6SOQcVK0',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });

	$mdThemingProvider.theme('default')

	.primaryPalette('green', {
		'default': '400',
      	'hue-1': '100',
      	'hue-2': '600',
      	'hue-3': 'A100'
	});

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
	});
	
});
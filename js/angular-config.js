appoie.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider,$facebookProvider) {
	
	$facebookProvider.setAppId('647852842030961');

	$mdIconProvider
    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
    .defaultIconSet('img/icons/sets/core-icons.svg', 24);

	$mdThemingProvider.theme('default')

	.primaryPalette('indigo', {
		'default': '500',
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
	
})
.run( function( $rootScope ) {
 
  // Carrega o SDK do Facebok
  (function(){
    if (document.getElementById('facebook-jssdk')) {return;}
    var firstScriptElement = document.getElementsByTagName('script')[0];
 
    var facebookJS = document.createElement('script');
    facebookJS.id = 'facebook-jssdk';
 
    facebookJS.src = '//connect.facebook.net/pt_BR/sdk.js';
    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
});
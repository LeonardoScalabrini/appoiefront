appoie.controller('mapController', ['$scope', '$localStorage', 'mapService', '$rootScope', 'markerService', '$timeout', function ($scope, $localStorage, mapService, $rootScope, markerService, $timeout) {

	mapHeight = window.innerHeight - 64;
  	$("#map").css('height', mapHeight);

  	$scope.estados = [
		{nome: "Acre"},
		{nome: "Alagoas"},
		{nome: "Amapá"},
		{nome: "Amazonas"},
		{nome: "Bahia"},
		{nome: "Ceará"},
		{nome: "Distrito Federal"},
		{nome: "Espírito Santo"},
		{nome: "Goiás"},
		{nome: "Maranhão"},
		{nome: "Mato Grosso"},
		{nome: "Mato Grosso do Sul"},
		{nome: "Minas Gerais"},
		{nome: "Pará"},
		{nome: "Paraíba"},
		{nome: "Paraná"},
		{nome: "Pernambuco"},
		{nome: "Piauí"},
		{nome: "Rio de Janeiro"},
		{nome: "Rio Grande do Norte"},
		{nome: "Rio Grande do Sul"},
		{nome: "Rondônia"},
		{nome: "Roraima"},
		{nome: "Santa Catarina"},
		{nome: "São Paulo"},
		{nome: "Sergipe"},
		{nome: "Tocantins"},
		{nome: "Acre"}	
	]

  	$rootScope.icones = [];
  	$scope.marcadores = [];
  	$rootScope.map;
  	$scope.postMin;
  	$rootScope.markers = [];

  	$scope.ROOT = $localStorage;
	
	$scope.initMap = function ()
	{

		$rootScope.map = new google.maps.Map(document.getElementById('map'), {
	        center: {
	            lat: -23.414106,  
	            lng: -51.9407117
	        },
	        zoom: 14,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    });
		

	  	if (navigator.geolocation)
	  	{
	    	navigator.geolocation.getCurrentPosition(function(position)
	    	{
	      		var pos = {
	        		lat: position.coords.latitude,
	        		lng: position.coords.longitude
	      		};

	      		$rootScope.map.setCenter(pos);
	    	}, 
	    	function() 
	    	{
	      		handleLocationError(true, infoWindow, $rootScope.map.getCenter());
	    	});

	  	} 
	  	else 
	  	{
	    	handleLocationError(false, infoWindow, $rootScope.map.getCenter());
	  	}

	  	if ($rootScope.icones.length == 0 && !$scope.ROOT.primeiroAcesso)
	  	{
	  		mapService.getIcons().then(function (response) {
	  			
	  			$rootScope.icones = response.data;

	  			mapService.getMarkers().then(function (response) {
					
					$scope.marcadores = response.data;
					markerService.initMarkers($scope.marcadores, $scope);
					  	  	
				}, function (response) {});
	  		}, function (response) {});
	  	}
	  	 	  
  	  	
	  	
	 // });
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos)
	{
	  	infoWindow.setPosition(pos);
	  	infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
	}

	$scope.fecharPublicacaoDetalhada = function () 
	{
		$(".appoie-modal, .appoie-info-modal").removeClass('animation-modal');

		$("#modal").fadeOut('slow', function() {
			$(this).addClass('hide-modal');
		});
	}
	
	$scope.compartilharFacebook = function(){			
		var publicacao = markerService.getPublicacao();
         console.log(publicacao.titulo); 	
		 FB.ui(
		    {
			   method: 'feed',
			   name: publicacao.titulo,
			   link: "http://www.facebook.com/sharer.php?u=" + encodeURIComponent("http://localhost:9092/#/home/external-xfbml"),
			   picture: "",
			   caption: "APPOIE.COM.BR",
			   description: publicacao.descricao,
			   message: ''
		    });		
	}

	$scope.apoiarPublicacaoDetalhada = function(publicacao) {
		if(!publicacao.apoiado) {
			mapService.apoiar(publicacao.idPublicacao).then(function() {
				publicacao.qtdApoiadores++;
				publicacao.apoiado = true;
			},
			function(){

			});
		}      

    }

    $scope.desapoiarPublicacaoDetalhada = function(publicacao) {
    	if(publicacao.apoiado) {
			mapService.desapoiar(publicacao.idPublicacao).then(function() {
				publicacao.qtdApoiadores--;
				publicacao.apoiado = false;
			},
			function(){

			});
		}    
    }


    $scope.enviarEstado = function (estado) {
    	mapService.selectEstado(estado).then(function (response) {
    		$rootScope.root.primeiroAcesso = false;
    		$scope.initMap();
    	}, function (response) {

    	});
    }


	var heightFotoUser = $(".pd-foto-user").width();
	$(".pd-foto-user").height(heightFotoUser);
	$(".pd-foto-user > img").width(heightFotoUser - 20);
	$(".pd-foto-user > img").height(heightFotoUser - 20);

}]);
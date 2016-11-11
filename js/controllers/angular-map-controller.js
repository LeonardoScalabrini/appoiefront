appoie.controller('mapController', ['$scope', 'mapService', '$rootScope', 'markerService', '$timeout', function ($scope, mapService, $rootScope, markerService, $timeout) {

	mapHeight = window.innerHeight - 64;
  	$("#map").css('height', mapHeight);

  	$rootScope.icones = [];
  	$scope.marcadores = [];
  	$rootScope.map;
  	$scope.postMin;
  	$rootScope.markers = [];


	$scope.initMap = function ()
	{
		$rootScope.map = new google.maps.Map(document.getElementById('map'), {
	        center: {
	            lat: -23.414106,  
	            lng: -51.9407117
	        },
	        zoom: 13,
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

	  	if ($rootScope.icones.length == 0)
	  	{


	  		mapService.getIcons().then(function (response) {
	  			//$scope.icones = response.data;
	  			
	  			$rootScope.icones = response.data;

	  			mapService.getMarkers().then(function (response) {
					
					$scope.marcadores = response.data;
					markerService.initMarkers($scope.marcadores, $scope);
					  	  	
				}, function (response) {

				
				});
	  		}, function (response) {

	  		});

	  	} 
	  	 	  
  	  	
	  	
	 // });
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos)
	{
	  	infoWindow.setPosition(pos);
	  	infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
	}

	apoiar = function(idPublicacao) 
	{
		// mapService.apoiar(idPublicacao).then(function(response) {

		// }, function() {

		// });

		alert("apoiou!");
	}	

	$scope.fecharPublicacaoDetalhada = function () 
	{
		$(".appoie-modal").removeClass('animation-modal');

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

}]);
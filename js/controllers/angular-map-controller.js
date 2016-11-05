appoie.controller('mapController', ['$scope', 'mapService', '$rootScope', 'markerService', function ($scope, mapService, $rootScope, markerService) {

	mapHeight = window.innerHeight - 64;
  	$("#map").css('height', mapHeight);

  	// $scope.icones = [];
  	// $scope.marcadores = [];

  	$rootScope.icones = [];
  	$scope.marcadores = [];
  	$rootScope.map;
  	$scope.postMin;
  	$rootScope.markers = [];


	$scope.initMap = function ()
	{
	//$(document).ready(function() {	
		
		$rootScope.map = new google.maps.Map(document.getElementById('map'), {
	        center: {
	            lat: -23.414106,  
	            lng: -51.9407117
	        },
	        zoom: 12,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	    //var infoWindow = new google.maps.InfoWindow({map: map});
	    
		 //    if($scope.icones.length > 0 || $scope.marcadores.length > 0) {
		 //    	$scope.initMarkers();
				
			// }
		

	  	if (navigator.geolocation) // Try HTML5 geolocation.
	  	{
	    	navigator.geolocation.getCurrentPosition(function(position)
	    	{
	      		var pos = {
	        		lat: position.coords.latitude,
	        		lng: position.coords.longitude
	      		};

	      		//infoWindow.setPosition(pos);

	      		// var marker = new google.maps.Marker({
	      		// 	position: {
	      		// 		lat: position.coords.latitude, 
	      		// 		lng: position.coords.longitude
	      		// 	}, 
	      		// 	map: map
	      		// });

	      		$rootScope.map.setCenter(pos);
	    	}, 
	    	function() 
	    	{
	      		handleLocationError(true, infoWindow, $rootScope.map.getCenter());
	    	});




	    	//initMarkers(map, $scope.posts, $scope.icones);

	  	} 
	  	else 
	  	{
	    	handleLocationError(false, infoWindow, $rootScope.map.getCenter()); // Browser doesn't support Geolocation
	  	}

	  	if ($rootScope.icones.length == 0)
	  	{


	  		mapService.getIcons().then(function (response) {
	  			//$scope.icones = response.data;
	  			
	  			$rootScope.icones = response.data;
	  			



	  			mapService.getMarkers().then(function (response) {
					
					$scope.marcadores = response.data;

					markerService.initMarkers($scope.marcadores);
					var idsPublicacoes = [];

					$scope.marcadores.forEach(function(obj) {
						idsPublicacoes.push(obj.idPublicacao);

					});

					

					mapService.verificarFechamentoPublicacao(idsPublicacoes);
					  	  	
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

	

	apoiar = function(idPublicacao) {
		// mapService.apoiar(idPublicacao).then(function(response) {

		// }, function() {

		// });

		alert("apoiou!");
	}	

}]);
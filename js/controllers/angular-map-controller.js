appoie.controller('mapController', ['$scope', 'mapService', function ($scope, mapService) {

	mapHeight = window.innerHeight - 64;
  	$("#map").css('height', mapHeight);

  	// $scope.icones = [];
  	// $scope.marcadores = [];

  	$scope.icones = [];
  	$scope.marcadores = [];
  	$scope.map;
  	var teste;
  	var passou = false;


	$scope.initMap = function ()
	{
	//$(document).ready(function() {	
		
		$scope.map = new google.maps.Map(document.getElementById('map'), {
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

	      		$scope.map.setCenter(pos);
	    	}, 
	    	function() 
	    	{
	      		handleLocationError(true, infoWindow, $scope.map.getCenter());
	    	});




	    	//initMarkers(map, $scope.posts, $scope.icones);

	  	} 
	  	else 
	  	{
	    	handleLocationError(false, infoWindow, map.getCenter()); // Browser doesn't support Geolocation
	  	}

	  	if ($scope.icones.length == 0)
	  	{


	  		mapService.getIcons().then(function (response) {
	  			//$scope.icones = response.data;
	  			
	  			$scope.icones = response.data;
	  			console.log($scope.icones);



	  			mapService.getMarkers().then(function (response) {
					
					$scope.marcadores = response.data;
					$scope.initMarkers();
					  	  	
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

	$scope.initMarkers = function()
	{

		var marcador;
		for (var i = 0; i < $scope.marcadores.length; i++) {
	 	
			(function(i){
			    setTimeout(function(){

			 		marcador = {};
					marcador = $scope.marcadores[i];
			        $scope.setMarkers(marcador);
			  }, 400  * i)
			 })(i);
		}

	
	}

	$scope.setMarkers= function(marcador)
	{
		//var postMin;
		//mapService.getPostMin(marcador.idPublicacao).then(function (response) {
  		//	postMin = response.data; 
  		debugger;
  		var icone = new Image();

		for (var i = 0; i < $scope.icones.length; i++) {
			if($scope.icones[i].categoria == marcador.categoria)
				icone.src = $scope.icones[i].foto;
		}		

		if (icone.src == "") return;
	
			var marker = new google.maps.Marker({
	      		position: new google.maps.LatLng(marcador.lat, marcador.lng),
	      		map: $scope.map,
	      		icon: icone.src,
	      		animation: google.maps.Animation.DROP,
	      		draggable: false
	      	});
	      	var infowindow = new google.maps.InfoWindow({
		    content: '<h2> Titulo da publicacao'
			  });
			  
			 marker.addListener('click', function() {
		  	  infowindow.open($scope.map, marker);
		  	});
	   			

  			
  		//}, function (response) {

  		//});
		

		

	      	
		
	}

}]);
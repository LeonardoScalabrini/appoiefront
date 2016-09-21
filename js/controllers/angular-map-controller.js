appoie.controller('mapController', ['$scope', 'mapService', function ($scope, mapService) {

	mapHeight = window.innerHeight - 64;
  	$("#map").css('height', mapHeight);

  	$scope.icones = [];
  	$scope.posts = [];

  	if ($scope.icones.length == 0)
  	{
  		mapService.getIcons().then(function (response) {
  			$scope.icones = response.data;
  		}, function (response) {

  		});
  	}

  	mapService.getPosts().then(function (response) {
  		$scope.posts = response.data;
  	}, function (response) {

  	});

	$scope.initMap = function ()
	{
		var map;
		map = new google.maps.Map(document.getElementById('map'), {
	        center: {
	            lat: -34.397, 
	            lng: 150.644
	        },
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	    //var infoWindow = new google.maps.InfoWindow({map: map});

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

	      		map.setCenter(pos);
	    	}, 
	    	function() 
	    	{
	      		handleLocationError(true, infoWindow, map.getCenter());
	    	});

	    	initMarkers(map, $scope.posts, $scope.icones);

	  	} 
	  	else 
	  	{
	    	handleLocationError(false, infoWindow, map.getCenter()); // Browser doesn't support Geolocation
	  	}
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos)
	{
	  	infoWindow.setPosition(pos);
	  	infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
	}

	function initMarkers(map, marcadores, icones)
	{
		for (var i = 0; i < marcadores.lenth; i++) {
			setTimeout(function () {
				setMarkers(map, marcadores, icones);
			}, i * 200);
		};
	}

	function setMarkers(map, marcadores, icones)
	{
		var icone = new Image();

		marcadores.forEach(function (p) 
		{
			icones.forEach(function (obj) 
			{
				switch (obj.categoria)
				{
					case "ILUMINACAO":
						icone.src = obj.foto;
						break;
					case "PAVIMENTACAO":
						icone.src = obj.foto;
						break;
				}
			});

			if (icone.src == "") return;

			var marker = new google.maps.Marker({
	      		position: new google.maps.LatLng(p),
	      		map: map,
	      		icon: icone.src,
	      		animation: google.maps.Animation.DROP,
	      		draggable: true
	      	});

	      	
		})
	}

}]);
appoie.controller('mapController', ['$scope', function ($scope) {

	mapHeight = window.innerHeight;
  	$("#map").css('height', mapHeight);

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

	    var infoWindow = new google.maps.InfoWindow({map: map});

	  	if (navigator.geolocation) // Try HTML5 geolocation.
	  	{
	    	navigator.geolocation.getCurrentPosition(function(position)
	    	{
	      		var pos = {
	        		lat: position.coords.latitude,
	        		lng: position.coords.longitude
	      		};

	      		infoWindow.setPosition(pos);
	      		infoWindow.setContent('Location found.');
	      		map.setCenter(pos);
	    	}, 
	    	function() 
	    	{
	      		handleLocationError(true, infoWindow, map.getCenter());
	    	});

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

}]);
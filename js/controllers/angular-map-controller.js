appoie.controller('mapController', ['$scope', 'mapService', function ($scope, mapService) {

	mapHeight = window.innerHeight - 64;
  	$("#map").css('height', mapHeight);

  	$scope.icones = [];
  	$scope.marcadores = [];
  	$scope.map;
  	$scope.postMin;

  	setInterval(function() { 
        mapService.notificar().then(console.log('chamou'));
    }, 5000);
  	
	$scope.initMap = function (){
		
		$scope.map = new google.maps.Map(document.getElementById('map'), {
	        center: {
	            lat: -23.414106,  
	            lng: -51.9407117
	        },
	        zoom: 12,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	  	if (navigator.geolocation) // Try HTML5 geolocation.
	  	{
	    	navigator.geolocation.getCurrentPosition(function(position)
	    	{
	      		var pos = {
	        		lat: position.coords.latitude,
	        		lng: position.coords.longitude
	      		};

	      		$scope.map.setCenter(pos);
	    	}, 
	    	function() 
	    	{
	      		handleLocationError(true, infoWindow, $scope.map.getCenter());
	    	});

	  	} 
	  	else 
	  	{
	    	handleLocationError(false, infoWindow, map.getCenter()); // Browser doesn't support Geolocation
	  	}

	  	if ($scope.icones.length == 0)
	  	{


	  		mapService.getIcons().then(function (response) {
	  			
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
			  }, 250 * i)
			 })(i);
		}
	
	}

	$scope.setMarkers= function(marcador)
	{
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

	      	mapService.getPostMin(marcador.idPublicacao).then(function(response) {
	      		
	      		$scope.postMin = response.data;
	      		idPublicacao = $scope.postMin.idPublicacao;
	      		console.log($scope.postMin);
	      		
	      		var infowindow = new google.maps.InfoWindow({
			    content: '<md-card id="iw-container" ng-controller="mapController">'

			    		+	'<div class="iw-title">'+ $scope.postMin.titulo +'</div>'

			    		+	'<div class="iw-content">'
			    		+		'<img class="img-publicacao" src="'+ $scope.postMin.foto +'" alt="">'
			    		+ 	'</div>'

			    		+	'<div class="iw-footer">'
			    		+		'<div layout="row">'

			    		+			'<div flex class="apoiar">'

			    		+				'<img src="/img/logo-apoiar.png">'
			    		+				'<p>Apoiar</p>'
			    		
			    		+			'</div>'

			    		+			'<div flex class="qtdApoiadores">'
			    		+				'<p>'+ $scope.postMin.qtdApoiadores +' Apoiadores</p>'
			    		+			'</div>'

			    		+		'</div>'
			    		+ 	'</div>'

			    		+	'<div class="iw-btn-modal">'
			    		+		'<div layout="row">'

			    		+			'<div flex class="show-modal">'
			    		+				'<md-button class="md-button md-raised md-primary">VER MAIS</md-button>'
			    		+			'</div>'

			    		+		'</div>'
			    		+ 	'</div>'
			    		+'</md-card>'		    		 

				});
				
				marker.addListener('click', function() {
				  	
					infowindow.open($scope.map, marker);
				  	console.log('abriu')
				  	
				  	if ($scope.postMin.apoiado){
						
				  		// Referência ao DIV que recebe o conteúdo da infowindow recorrendo ao jQuery   
					  	var iwOuter = $('.gm-style-iw');
					  	var btnApoiar = iwOuter.find('.apoiar > p');
					  	var imgApoiar = iwOuter.find('.apoiar > img');
					  	
						imgApoiar.removeAttr('src');
						imgApoiar.attr('src', '/img/logo-apoiado.png');
		      		}
				});
				
				google.maps.event.addListener(infowindow, 'domready', function() {
					
					// Referência ao DIV que recebe o conteúdo da infowindow recorrendo ao jQuery   
					var iwOuter = $('.gm-style-iw');
					
				   /* Uma vez que o div pretendido está numa posição anterior ao div .gm-style-iw.
				    * Recorremos ao jQuery e criamos uma variável iwBackground,
				    * e aproveitamos a referência já existente do .gm-style-iw para obter o div anterior com .prev().
				    */
				   var iwBackground = iwOuter.prev();

				   // Remover o div da sombra do fundo
				   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

				   // Remover o div de fundo branco
				   iwBackground.children(':nth-child(4)').css({'display' : 'none'});

					iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px'});
					
					// Aproveitando a referência já criada ao div .gm-style-iw com a variável iwOuter.
					// Criamos uma nova variável iwCloseBtn.
					// Utilizando o método .next() do JQuery referenciamos o div seguinte ao div .gm-style-iw.
					// É este div que agrupa os elementos do botão fechar.
					var iwCloseBtn = iwOuter.next();
					var indicador = iwOuter.prev();

					indicador.css({
						zIndex: 1
					})

					// Aplica o efeito desejado ao botão fechar
					iwCloseBtn.css({
					  opacity: '1', // por padrão o botão fechar tem uma opacidade de 0.7
					  right: '28px', 
					  top: '8px', // reposicionamento do botão
					  border: '1px solid #48b5e9', // aumento da borda do botão e nova cor
					  'border-radius': '13px', // efeito circular
					  'box-shadow': '0 0 5px #3990B9' // efeito 3D para salientar o botão
					});

					// A API aplica automaticamente 0.7 de opacidade ao botão após o evento mouseout.
					// Esta função reverte esse evento para o valor desejado.
					iwCloseBtn.mouseout(function(){
					  $(this).css({opacity: '1'});
					});
					
					var btnApoiar = iwOuter.find('.apoiar > p');
					var imgApoiar = iwOuter.find('.apoiar > img');
					
					btnApoiar.on('click', function(event) {

						event.preventDefault();
						
						console.log($scope.postMin.apoiado)
						
						if (!$scope.postMin.apoiado){
							mapService.apoiar(marcador.idPublicacao).then(function (response) {
								
								$scope.postMin.idApoiado = response.data; 
							
								imgApoiar.removeAttr('src');
								imgApoiar.attr('src', '/img/logo-apoiado.png');
								
								$scope.postMin.qtdApoiadores = $scope.postMin.qtdApoiadores + 1;

							}, function (response) {

							});
						}
						else
						{
							mapService.desapoiar($scope.postMin.idApoiado).then(function (response) {
								
								$scope.postMin.idApoiado = null;
								imgApoiar.removeAttr('src');
								imgApoiar.attr('src', '/img/logo-apoiar.png');
								
								$scope.postMin.qtdApoiadores = $scope.postMin.qtdApoiadores - 1;

							}, function (response) {

							});
						}
						
					});

				});

			}, function(response) {

			});
	}	

}]);
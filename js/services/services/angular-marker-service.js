appoie.service('markerService', ['$http', 'mapService', '$rootScope', function ($http, mapService, $rootScope) {

	var postMin;
	var infoWindowAnterior;

	this.initMarkers = function(marcadores)
	{		
		for (var i = 0; i < marcadores.length; i++) {
	 	
			(function(i){
			    setTimeout(function(){

			 		marcador = {};
					marcador = marcadores[i];
			        setMarker(marcador);
			  }, 250 * i)
			 })(i);
		}
	
	}

	this.getPostMin = function(id) {
		return $http.get('publicacao/previa/' + id);
	}

	getPostReduzido = function(id) {
		return $http.get('publicacao/previa/' + id);
	}

	setMarker= function(marcador)
	{	
  		
  		var icone = new Image();
  		postMin = {};

		for (var i = 0; i < $rootScope.icones.length; i++) {
			if($rootScope.icones[i].categoria == marcador.categoria)
				icone.src = $rootScope.icones[i].foto;
		}		

		if (icone.src == "") return;
	
			var marker = new google.maps.Marker({
	      		position: new google.maps.LatLng(marcador.lat, marcador.lng),
	      		map: $rootScope.map,
	      		icon: icone.src,
	      		animation: google.maps.Animation.DROP,
	      		draggable: false
	      	});

	      	$rootScope.markers.push(marker);

	      	getPostReduzido(marcador.idPublicacao).then(function(response) {	      		
	      		postMin = response.data;
	      		idPublicacao = postMin.idPublicacao;
	      		
	      		var infowindow = new google.maps.InfoWindow({
			    content: '<md-card id="iw-container" ng-controller="mapController">'

			    		+	'<div class="iw-title">'+ postMin.titulo +'</div>'

			    		+	'<div class="iw-content">'
			    		+		'<img class="img-publicacao" src="'+ postMin.foto +'" alt="">'
			    		+ 	'</div>'

			    		+	'<div class="iw-footer">'
			    		+		'<div layout="row">'

			    		+			'<div flex class="apoiar">'

			    		+				'<img src="/img/logo-apoiar.png">'
			    		+				'<p>Apoiar</p>'
			    		
			    		+			'</div>'

			    		+			'<div flex class="qtdApoiadores">'
			    		+				'<p>'+ postMin.qtdApoiadores +' Apoiadores</p>'
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
					if(infoWindowAnterior != null) {
						if(infoWindowAnterior == infowindow) {
							if(isInfoWindowOpen(infowindow)) { 
								infoWindowAnterior = infowindow;
								infowindow.close();	
							}
							else{
								infowindow.open($rootScope.map, marker);
								infowindowAnterior = infowindow;
							}
						}
						else {
							infoWindowAnterior.close();
							infoWindowAnterior = infowindow;
							infowindow.open($rootScope.map, marker);		
						}						
					}		
					else {
						infoWindowAnterior = infowindow;
						infowindow.open($rootScope.map, marker);
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

						if (!$(this).hasClass('apoiado'))
						{
							// mapService.apoiar($scope.postMin.idPublicacao).then(function (response) {

								$(this).addClass('apoiado');

								$(this).html('apoiado');

								imgApoiar.removeAttr('src');
								imgApoiar.attr('src', '/img/logo-apoiado.png');

							// }, function (response) {

							// });
						}
						else
						{
							// mapService.apoiar($scope.postMin.idPublicacao).then(function (response) {

								$(this).removeClass('apoiado');

								$(this).html('apoiar');

								imgApoiar.removeAttr('src');
								imgApoiar.attr('src', '/img/logo-apoiar.png');

							// }, function (response) {

							// });
						}
						

					});

				});

			}, function(response) {

			});	      	
		
	}
	isInfoWindowOpen = function(infoWindow){
	    var map = infoWindow.getMap();
	    return (map !== null && typeof map !== "undefined");
	}

	this.clearMarker = function() {
	  		
	  for (var i = 0; i < $rootScope.markers.length; i++ ) {
	    $rootScope.markers[i].setMap(null);
	  }
	  $rootScope.markers.length = 0;
	}
	
	
}])
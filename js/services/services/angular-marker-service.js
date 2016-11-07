appoie.service('markerService', ['$http', 'mapService', '$rootScope', '$compile', '$mdPanel', function ($http, mapService, $rootScope, $compile, $mdPanel) {

	var infoWindowAnterior;
	var content = '';
	var previaHTML;
	var infowindow;
	var tempID;

	this.initMarkers = function(marcadores, scope)
	{		
		for (var i = 0; i < marcadores.length; i++) {
	 	
			(function(i){

			    setTimeout(function(){

			 		marcador = {};
					marcador = marcadores[i];
			        setMarker(marcador, scope);

			  	}, 250 * i)

			})(i);
		}
	
	}

	getPublicacaoDetalhada = function (id)
	{
		return $http.get('publicacao/detalhada/' + id);
	}

	this.getPostMin = function(id) {
		return $http.get('publicacao/previa/' + id);
	}

	getPostReduzido = function(id) {
		return $http.get('publicacao/previa/' + id);
	}

	setMarker= function(marcador, scope)
	{	
  		
  		var icone = new Image();

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

	    marker.addListener('click', function() {

	    	getPostReduzido(marcador.idPublicacao).then(function (response) {

	    		$rootScope.previousPost = response.data;

	    		previaHTML = '<md-card id="iw-container" ng-controller="mapController">' 

							+	'<div class="iw-title">' + $rootScope.previousPost.titulo + '</div>' 

							+	'<div class="iw-content">' 
							+		'<img class="img-publicacao" src="' + $rootScope.previousPost.foto + '" alt="">' 
							+	'</div>' 

							+	'<div class="iw-footer">' 
							+		'<div layout="row">' 

							+			'<div flex class="apoiar">'

							+				'<div class="img-like img-like-background"></div>'

							+				'<p>Apoiar</p>'
											    		
							+			'</div>'

							+			'<div flex class="qtdApoiadores">'
							+				'<p>' + $rootScope.previousPost.qtdApoiadores + ' Apoiadores</p>'
							+			'</div>'

							+		'</div>'
							+	'</div>'

							+	'<div class="iw-btn-modal">'
							+		'<div layout="row">'

							+			'<div flex class="show-modal">'
							+				'<md-button class="md-button md-raised md-primary" ng-click="showDetails()">VER MAIS</md-button>'
							+			'</div>'

							+		'</div>'
							+	'</div>'

							+  '<md-card>';

				// PROBLEMA RESOLVIDO COMPILANDO O TEMPLATE ACIMA COM A FUNÇÃO $compile DO ANGULARJS.
				compiled = $compile(previaHTML)(scope);

				// CRIA UM NOVO INFOWINDOW E LOGO EM SEGUIDA SETA O TEMPLATE COMPILADO DENTRO DO CONTEÚDO DELE.
				infowindow = new google.maps.InfoWindow();
				infowindow.setContent(compiled[0]);

	    		google.maps.event.addListener(infowindow, 'domready', function() {

				   	var iwOuter = $('.gm-style-iw');
				   	var iwBackground = iwOuter.prev();

				   	iwBackground.children(':nth-child(2)').css({'display' : 'none'});
				   	iwBackground.children(':nth-child(4)').css({'display' : 'none'});
				   	iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px'});

					var iwCloseBtn = iwOuter.next();
					var indicador = iwOuter.prev();

					indicador.css({
						zIndex: 1
					})

					iwCloseBtn.css({
					  opacity: '1',
					  right: '28px', 
					  top: '8px',
					  border: '1px solid #48b5e9',
					  'border-radius': '13px',
					  'box-shadow': '0 0 5px #3990B9'
					});

					iwCloseBtn.mouseout(function(){
					  $(this).css({opacity: '1'});
					});

					var btnApoiar = iwOuter.find('.apoiar > p');
					var imgApoiar = iwOuter.find('.apoiar > .img-like');

					btnApoiar.on('click', function(event) {

						event.preventDefault();

						if (!$(this).hasClass('apoiado'))
						{
							// mapService.apoiar($scope.postMin.idPublicacao).then(function (response) {

								$(this).addClass('apoiado');
								$(this).html('apoiado');

								imgApoiar.removeClass('img-like-background');
								imgApoiar.addClass('img-liked-background');

							// }, function (response) {

							// });
						}
						else
						{
							// mapService.apoiar($scope.postMin.idPublicacao).then(function (response) {

								$(this).removeClass('apoiado');
								$(this).html('apoiar');

								imgApoiar.removeClass('img-liked-background');
								imgApoiar.addClass('img-like-background');

							// }, function (response) {

							// });
						}	

					});

				});

				if(infoWindowAnterior != null)
				{
					if(infoWindowAnterior == infowindow) 
					{
						if(isInfoWindowOpen(infowindow)) 
						{ 
							infoWindowAnterior = infowindow;
							infowindow.close();	
						}
						else
						{
							infowindow.open($rootScope.map, marker);
							infowindowAnterior = infowindow;
						}
					}
					else 
					{
						infoWindowAnterior.close();
						infoWindowAnterior = infowindow;
						infowindow.open($rootScope.map, marker);		
					}						
				}		
				else 
				{
					infoWindowAnterior = infowindow;
					infowindow.open($rootScope.map, marker);
				}

	    	}, function (response) {

	    	});

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

	$rootScope.showDetails = function ()
	{
		// COMPARANDO SE O ID JÁ REQUISITADO É O MESMO DA VARIÁVEL TEMPORÁRIA tempID. SE FOR IGUAL, ELE NÃO FAZ A REQUISIÇÃO NOVAMENTE.
		if (tempID != $rootScope.previousPost.idPublicacao)
		{
			getPublicacaoDetalhada($rootScope.previousPost.idPublicacao).then(function (response) {

				$rootScope.publicacaoDetalhada = response.data;
				tempID = $rootScope.previousPost.idPublicacao;


				// Verificando há quantos dias a publicação está aberta dependendo do status da publicação.
				var dataPublicada = moment($rootScope.publicacaoDetalhada.dataPublicacao);
				var dataAtual = moment();

				if ($rootScope.publicacaoDetalhada.status == "ABERTO")
				{
					$rootScope.publicacaoDetalhada.diasContados = dataAtual.diff(dataPublicada, 'days');
				}
				else
				{
					
				}

				$("#modal").fadeIn('fast', function() {
					$(this).removeClass('hide-modal');
					$(".appoie-modal").addClass('animation-modal');
				});

			}, function (response) {

			});
		}
		else
		{
			$("#modal").fadeIn('fast', function() {
				$(this).removeClass('hide-modal');
				$(".appoie-modal").addClass('animation-modal');
			});
		};
	}



}]);
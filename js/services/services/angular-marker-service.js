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
	    		$rootScope.map.setCenter(marker.position);

	    		$rootScope.previousPost = response.data;
	    		
	    		previaHTML = '<md-card id="iw-container" ng-controller="mapController">' 

							//+	'<div class="iw-title">' + $rootScope.previousPost.titulo + '</div>' 
							+	'<div class="iw-title">{{previousPost.titulo}}</div>' 

							+	'<div class="iw-content">' 
							//+		'<img class="img-publicacao" src="' + $rootScope.previousPost.foto + '" alt="">' 
							+		'<img class="img-publicacao" ng-src="{{previousPost.foto}}" alt="">' 
							+	'</div>' 

							+	'<div class="iw-footer">' 
							+		'<div layout="row">' 

							+			'<div flex class="apoiar">'

							+				'<div class="img-like img-like-background"></div>'

							+				'<p>Apoiar</p>'
											    		
							+			'</div>'

							+			'<div flex class="qtdApoiadores">'
							+				'<p>{{previousPost.qtdApoiadores}} Apoiadores</p>'
							+			'</div>'

							+		'</div>'
							+	'</div>'

							+	'<div class="iw-btn-modal">'
							+		'<div layout="row">'

							+			'<div flex class="show-modal">'
							+				'<md-button class="md-button md-raised dark-primary-color" ng-click="showDetails()">VER MAIS</md-button>'
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


					if($rootScope.previousPost.apoiado) {
						
						btnApoiar.addClass('apoiado');
						btnApoiar.html('Apoiado');
						imgApoiar.removeClass('img-like-background');
						imgApoiar.addClass('img-liked-background');
					}
					else {
						btnApoiar.removeClass('apoiado');
						btnApoiar.html('Apoiar');
						imgApoiar.removeClass('img-liked-background');
						imgApoiar.addClass('img-like-background');
					}

					btnApoiar.on('click', function(event) {

						event.preventDefault();

						apoiar($(this), imgApoiar);	

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
	
	publicacao= {};

	$rootScope.showDetails = function ()
	{
		var btnApoiarPD = $('.pd-apoiar > p');
		var imgApoiarPD = $('.pd-apoiar .pd-img-like');

		// COMPARANDO SE O ID JÁ REQUISITADO É O MESMO DA VARIÁVEL TEMPORÁRIA tempID. SE FOR IGUAL, ELE NÃO FAZ A REQUISIÇÃO NOVAMENTE.
		if (tempID != $rootScope.previousPost.idPublicacao)
		{
			getPublicacaoDetalhada($rootScope.previousPost.idPublicacao).then(function (response) {

				$rootScope.publicacaoDetalhada = response.data;
				tempID = $rootScope.previousPost.idPublicacao;
				publicacao = $rootScope.publicacaoDetalhada;
				publicacaoCompleta();

				if ($rootScope.publicacaoDetalhada.apoiado)
				{
					btnApoiarPD.addClass('apoiado');
					btnApoiarPD.html('Apoiado');
					imgApoiarPD.removeClass('img-like-background');
					imgApoiarPD.addClass('img-liked-background');
				}
				else
				{
					btnApoiarPD.removeClass('apoiado');
					btnApoiarPD.html('Apoiar');
					imgApoiarPD.removeClass('img-liked-background');
					imgApoiarPD.addClass('img-like-background');
				}

				btnApoiarPD.on('click', function(event) {

					event.preventDefault();

					apoiar($(this), imgApoiarPD);	

				});

				// Verificando há quantos dias a publicação está aberta dependendo do status da publicação.
				var dataPublicada = moment($rootScope.publicacaoDetalhada.dataPublicacao);
				var dataAtual = moment();

				if ($rootScope.publicacaoDetalhada.status == "ABERTO")
				{
					$rootScope.publicacaoDetalhada.diasContados = dataAtual.diff(dataPublicada, 'days');
				}

				// COMPARANDO A ALTURA COM A LARGURA DA IMAGEM
				if ($rootScope.publicacaoDetalhada.fotos[0].foto.naturalHeight > $rootScope.publicacaoDetalhada.fotos[0].foto.naturalWidth)
					$(".pd-foto img").addClass('img-height');
				else
					$(".pd-foto img").addClass('img-width');

				// ANALISANDO A CRITICIDADE E APLICANDO A POSIÇÃO DO GRÁFICO
				switch ($rootScope.publicacaoDetalhada.criticidade) {
					case 'BAIXA':
						$(".pd-criticidade-grafico").css('text-align', 'left');
						break;

					case 'MEDIA':
						$(".pd-criticidade-grafico").css('text-align', 'center');
						break;

					case 'ALTA':
						$(".pd-criticidade-grafico").css('text-align', 'right');
						break;
				};

				$("#modal").fadeIn('fast', function() {
					$(this).removeClass('hide-modal');
					$(".appoie-modal, .appoie-info-modal").addClass('animation-modal');
				});

			}, function (response) {

			});
		}
		else
		{
			$("#modal").fadeIn('fast', function() {
				$(this).removeClass('hide-modal');
				$(".appoie-modal, .appoie-info-modal").addClass('animation-modal');
			});
		};
	}
	
	publicacaoCompleta = function(){
		return publicacao;
		
	}
	
	this.getPublicacao = function(){
		return publicacaoCompleta();
	}

	apoiar = function (btnApoiar, imgApoiar)
	{
		if (!btnApoiar.hasClass('apoiado'))
		{
			mapService.apoiar($rootScope.previousPost.idPublicacao).then(function (response) {

				btnApoiar.addClass('apoiado');
				btnApoiar.html('Apoiado');

				imgApoiar.removeClass('img-like-background');
				imgApoiar.addClass('img-liked-background');

				$rootScope.previousPost.qtdApoiadores++;

			}, function (response) {

			});
		}
		else
		{
			mapService.desapoiar($rootScope.previousPost.idPublicacao).then(function (response) {

				btnApoiar.removeClass('apoiado');
				btnApoiar.html('Apoiar');

				imgApoiar.removeClass('img-liked-background');
				imgApoiar.addClass('img-like-background');

				$rootScope.previousPost.qtdApoiadores--;

			}, function (response) {

			});
		}
	}



}]);
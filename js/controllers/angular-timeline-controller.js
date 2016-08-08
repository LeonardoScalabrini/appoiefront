application.controller('timelineController', ['$scope', '$rootScope', 'timelineService', 'userService', function ($scope, $rootScope, timelineService, userService) {

	$scope.remove = false;
	$scope.contFotos = 0;
	$scope.quantidadeFotos = [];
	var nFotos = 0;

	var img01 = "";
	var img02 = "";
	var img03 = "";

	$scope.adicionar = function ()
	{
		for (var i = 1; i <= 3; i++)
		{
			var input = ".img" + i;
			if (!$(input).val())
			{
				clickInput($(input));
				break;
			};
		};

		$(input).on('change', function (e)
		{
			var image = "#img" + i;
			ImagePreview(this, image, i);
			nFotos++;

			if (nFotos == 3)
			{
				$(".add").addClass('hide');
			};

			//e.stopImmediatePropagation();
		});

		//e.stopImmediatePropagation();
	};

	function ImagePreview (input, image, i)
	{
		
	    if (input.files && input.files[0])
		{
	        var fileHeader = new FileReader();

	        fileHeader.onload = function(e)
			{
	            $(image).attr("src", e.target.result);
	            $(image).next().removeClass('hide');

	            if (i == 1)
					img01 = e.target.result;
				else if (i == 2)
					img02 = e.target.result;
				else if (i == 3)
					img03 = e.target.result;
	        }

	        fileHeader.readAsDataURL(input.files[0]);
	    }

	};

	var clickInput = function (input)
	{
		input.click();
	}

	$(".remove").click(function (e)
	{
		$(this).prev().attr('src', '');
		var input = "." + $(this).parent().find('img').attr("id");
		$(this).addClass('hide');
		$(input).val("");
		$(".add").removeClass('hide');
		nFotos--;

		e.stopImmediatePropagation();

	});

	$(window).scroll(function(event)
	{
		if ($(this).scrollTop() >= 100)
		{
			$(".post-alternativo").fadeIn('fast', function() {
				$(this).removeClass('hide');
			});
		}
		else
		{
			$(".post-alternativo").fadeOut('fast', function() {
				$(this).addClass('hide');
			});
		};
	});

	$scope.fotosPublicadas = function (fotos)
	{
		$scope.srcFoto1 = fotos[0];
		$scope.srcFoto2 = fotos[1];
		$scope.srcFoto3 = fotos[2];
	}

	$("body").on('click', function(event) {
		
		if (!$(".menu-actions").hasClass('hide'))
			$(".menu-actions").addClass('hide');

		if (!$(".info-user-action").hasClass('hide'))
			$(".info-user-action").addClass('hide');

	});

	$scope.formataDataPublicacao = function (data)
	{
		
		var timeStamp = parseInt(data/*.substr(33, 13)*/);
		var d = new Date(timeStamp);

		dataPublicacao = d.getDay().toString() + '/' + d.getMonth().toString() + '/' + d.getFullYear().toString();
		return dataPublicacao;
	}


	// ==========================================================================

	$scope.posts = [];
	$rootScope.user = {};

	$scope.getInfoUsuario = function ()
	{
		userService.buscarInfoUsuario().then(function (response) {

			$rootScope.user = response.data;

		}, function (e) {

		});
	}

	$scope.publicar = function (post)
	{
		var post = {

			titulo: post.titulo,
			descricao: post.descricao,
			categoria: "ILUMINICACAO",
			fotos: [
				img01,
				img02,
				img03
			]

		}

		timelineService.publicar(post).then(function (response) {

			$scope.listar();
			
		}, function (e) {
			alert('Erro');
		});
	}

	$scope.listar = function ()
	{
		timelineService.listar().then(function (response) {

			if(response.data.length > 0) {
				for(i in response.data) {
					response.data[i].dataPublicacao = $scope.formataDataPublicacao(response.data[i].dataPublicacao.toString())
					$scope.posts.push(response.data[i]);
				}				
			}
			else{
				$scope.posts = response.data;
			}
			

			setTimeout(function(){ $scope.$apply(); },1000);

		}, function (e) {
			alert('Erro');
		});
	}


	$scope.init = function(){
		$scope.listar();
	};
	

	
}]);
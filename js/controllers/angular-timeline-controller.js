application.controller('timelineController', ['$scope', function ($scope) {

	$scope.remove = false;
	var nFotos = 0;

	$(".add").click(function (e)
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
			ImagePreview(this, image);
			nFotos++;

			if (nFotos == 3)
			{
				$(".add").addClass('hide');
			};

			e.stopImmediatePropagation();
		});	

		e.stopImmediatePropagation();
	});

	function ImagePreview (input, image)
	{
		
	    if (input.files && input.files[0])
		{
	        var fileHeader = new FileReader();

	        fileHeader.onload = function(e)
			{	
	            $(image).attr("src", e.target.result);
	            $(image).next().removeClass('hide');
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

	$(".show-menu-actions, .share, .delate").hover(function() {
		$(".menu-actions").removeClass('hide');
	}, function() {
		$(".menu-actions").addClass('hide');
	});
	
}]);
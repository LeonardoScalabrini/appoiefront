application.controller('timelineController', ['$scope', function ($scope) {

	$scope.remove = false;
	var nFotos = 0;

	$(".add").on('click', function()
	{
		for (var i = 1; i <= 3; i++)
		{
			var input = ".img" + i;
			if (!$(input).val())
			{
				$(input).click();
				break;
			};
		};

		$(input).on('change', function()
		{
			var image = "#img" + i;
			ImagePreview(this, image);
			nFotos++;

			if (nFotos == 3)
			{
				$(".add").addClass('hide');
			};
		});	
	});

	function ImagePreview (input, image)
	{
		debugger;
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

	$(".remove").on('click', function(event)
	{
		debugger;
		$(this).prev().attr('src', '');
		var input = "." + $(this).parent().find('img').attr("id");
		$(this).addClass('hide');
		$(input).val("");
		$(".add").removeClass('hide');
		nFotos--;

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
	
}]);
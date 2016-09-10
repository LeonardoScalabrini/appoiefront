appoie.factory('indexFactory', ['$mdToast', function ($mdToast) {

	return {

		notification: function (classe, mensagem)
		{
			return $mdToast.show(
				{
			        template: '<div class="' + classe +'">' + mensagem + '</div>',
			        hideDelay: 3000
		    	}
		    );
		}
		
	}

}]);
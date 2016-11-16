// appoie.directive('initMap', ['', function(){

// 	return {
// 		// name: '',
// 		// priority: 1,
// 		// terminal: true,
// 		// scope: {}, // {} = isolate, true = child, false/undefined = no change
// 		controller: 'mapController',
// 		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
// 		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
// 		// template: '',
// 		// templateUrl: '',
// 		// replace: true,
// 		// transclude: true,
// 		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
// 		link: function ($scope, $element, $attrs) {

// 			$scope.map = new google.maps.Map($element, {
// 		        center: {
// 		            lat: -23.414106,  
// 		            lng: -51.9407117
// 		        },
// 		        zoom: 12,
// 		        mapTypeId: google.maps.MapTypeId.ROADMAP
// 		    });

// 		    $scope.$apply();
			
// 		}
// 	};

// }]);


appoie.directive('initMap', initMap);
    
function initMap () {

    return {

        template: '<h1> Olá, Olá, Olá, Olá, Olá</h1>'
    }

}
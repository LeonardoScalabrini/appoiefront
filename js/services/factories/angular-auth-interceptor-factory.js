appoie.factory('AuthInterceptor', ['$q', '$window', '$location', '$injector', function ($q, $window, $location, $injector) {

    var AppoieStorageService = $injector.get("AppoieStorageService");
    return {

        request: function (config) {
        	console.log('request');
            config.headers = config.headers || {};
            //insere o token no header do cabeçalho
            if (AppoieStorageService.token.get()) {
                config.headers.Authorization = AppoieStorageService.token.get();
            }
            return config || $q.when(config);
        },
        response: function (response) {
        	console.log('response');
            return response || $q.when(response);
        },
        responseError: function (rejection) {
        	console.log('responseError');
            if (rejection.status === 403) {
                //limpa o token do storage
                AppoieStorageService.token.clear();
                $location.path("/login");
            } else {
                var message = rejection.data + '<br><br><i>' + rejection.status + ' - ' + rejection.statusText + '</i>';
                console.log(message);
            }
            return $q.reject(rejection);
        }
    };
}]);

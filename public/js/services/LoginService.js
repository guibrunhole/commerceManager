(function() {

    'use strict';

    function loginService($http, BASE_ADDRESS) {

        return {
            attemptLogin: function(credentials) {

                return $http.post(BASE_ADDRESS + '/login', credentials);
            },
            verifyLogin: function() {

                return $http.get(BASE_ADDRESS + '/loggedIn');
            },
            logout: function() {

                return $http.get(BASE_ADDRESS + '/logout');
            }
        };
    }

    angular.module('app.services').service('LoginService', ['$http', 'BASE_ADDRESS', loginService]);
})();
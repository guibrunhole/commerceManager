(function () {

    'use strict';

    function userService($http, BASE_ADDRESS) {

        return {

            getAll: function(searchParam) {

                var data = {
                    searchParam: searchParam
                };

                return $http.get(BASE_ADDRESS + '/user', {params: data});
            },
            getById: function(userId) {

                return $http.get(BASE_ADDRESS + '/user/' + userId);
            },
            remove: function(userId) {

                return $http.delete(BASE_ADDRESS + '/user/' + userId);
            },
            add: function(newUser) {

                return $http.post(BASE_ADDRESS + '/user', newUser);
            },
            update: function(userId, updatedUser) {

                return $http.put(BASE_ADDRESS + '/user/' + userId, updatedUser);
            }
        };
    }

    angular.module('app.services').factory('UserService', ['$http', 'BASE_ADDRESS', userService]);
})();
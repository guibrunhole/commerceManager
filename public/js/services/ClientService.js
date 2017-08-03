(function () {

    'use strict';

    function clientService($http, BASE_API_ADDRESS) {

        return {

            getAll: function(searchParam) {

                var data = {
                    searchParam: searchParam
                };

                return $http.get(BASE_API_ADDRESS + '/client', {params: data});
            },
            getById: function(clientId) {

                return $http.get(BASE_API_ADDRESS + '/client/' + clientId);
            },
            remove: function(clientId) {

                return $http.delete(BASE_API_ADDRESS + '/client/' + clientId);
            },
            add: function(newClient) {

                return $http.post(BASE_API_ADDRESS + '/client', newClient);
            },
            update: function(clientId, updatedClient) {

                return $http.put(BASE_API_ADDRESS + '/client/' + clientId, updatedClient);
            }
        };
    }

    angular.module('app.services').factory('ClientService', ['$http', 'BASE_API_ADDRESS', clientService]);
})();

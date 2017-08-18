(function() {

    'use strict';

    function expenseService($http, BASE_ADDRESS) {

        return {

            getAll: function(searchParam) {

                var data = {
                    searchParam: searchParam
                };

                return $http.get(BASE_ADDRESS + '/expense', {params: data});
            },
            add: function(expense) {

                return $http.post(BASE_ADDRESS + '/expense', expense);
            },
            remove: function(id) {

                return $http.delete(BASE_ADDRESS + '/expense/' + id);
            },
            getById: function(expenseId) {

                return $http.get(BASE_ADDRESS + '/expense/' + expenseId);
            }
        };
    }

    angular.module('app.services').service('ExpenseService', ['$http', 'BASE_ADDRESS', expenseService]);
})();

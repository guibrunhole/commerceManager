(function () {

    'use strict';

    function supplierService($http, BASE_ADDRESS) {

        return {

            getAll: function(searchParam) {

                var data = {
                    searchParam: searchParam
                };

                return $http.get(BASE_ADDRESS + '/supplier', {params: data});
            },
            getById: function(supplierId) {

                return $http.get(BASE_ADDRESS + '/supplier/' + supplierId);
            },
            remove: function(supplierId) {

                return $http.delete(BASE_ADDRESS + '/supplier/' + supplierId);
            },
            add: function(newSupplier) {

                return $http.post(BASE_ADDRESS + '/supplier', newSupplier);
            },
            update: function(supplierId, updatedSupplier) {

                return $http.put(BASE_ADDRESS + '/supplier/' + supplierId, updatedSupplier);
            }
        };
    }

    angular.module('app.services').factory('SupplierService', ['$http', 'BASE_ADDRESS', supplierService]);
})();

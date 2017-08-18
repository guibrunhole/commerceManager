(function() {

    'use strict';

    function supplierEditCtrl($scope, $location, SupplierService, $routeParams, AlertService) {

        $scope.supplier = {};

        $scope.cancel = function() {

            $location.url('/supplier');
        };

        $scope.update = function() {

            SupplierService.update($routeParams.id, $scope.supplier)
                .success(function() {

                    AlertService.addSuccess('Fornecedor editado com sucesso!');
                    $location.url('/supplier');
                });
        };

        function load() {

            SupplierService.getById($routeParams.id)
                .success(function(supplier) {

                    $scope.supplier = angular.copy(supplier);
                })
                .error(function() {

                    $location.url('/supplier');
                });
        }

        load();
    }

    angular.module('app.controllers').controller('SupplierEditController', supplierEditCtrl);
})();

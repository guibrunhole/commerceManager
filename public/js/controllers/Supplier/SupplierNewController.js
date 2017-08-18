(function() {

    'use strict';

    function supplierNewCtrl($scope, $location, SupplierService, AlertService) {

        $scope.supplier = {};

        $scope.cancel = function() {

            $location.url('/supplier');
        };

        $scope.save = function() {

            SupplierService.add($scope.supplier)
                .success(function() {

                    AlertService.addSuccess('Supplier incluido com sucesso!');
                    $location.url('/supplier');
                });
        };
    }


    angular.module('app.controllers').controller('SupplierNewController', supplierNewCtrl);
})();

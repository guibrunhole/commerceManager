(function() {

    'use strict';

    function expenseNewCtrl($scope, ExpenseService, SupplierService, $location, AlertService) {

        $scope.expense = {
            supplierId: undefined,
            products: []
        };

        $scope.product = {
            name: undefined,
            price: undefined,
            quantity: undefined,
            unity: undefined
        };

        $scope.addProduct = function() {

            if(!$scope.product.name || !$scope.product.price || !$scope.product.quantity || !$scope.product.unity) {
                AlertService.addError("É necessário informar todos os campos do produto.");
                return;
            }

            $scope.expense.products.push(angular.copy($scope.product));

            $scope.product.name = undefined;
            $scope.product.price = undefined;
            $scope.product.quantity = undefined;
            $scope.product.unity = undefined;
        };

        $scope.cancel = function() {

            $location.url('/expense');
        };

        $scope.save = function() {

            ExpenseService.add($scope.expense)
                .success(function() {

                    AlertService.addSuccess('Despesa incluido com sucesso!');
                    $location.url('/expense');
                });
        };

        $scope.getSuppliers = function(searchParam) {

            return SupplierService.getAll(searchParam)
                .then(function(res) {

                    return res.data;
                });
        };

        $scope.setSupplier = function(selectedItem) {

            $scope.expense.supplierId = angular.copy(selectedItem.id);
        };

        $scope.remove = function(itemIndex) {

            $scope.expense.products.splice(itemIndex, 1);
        }
    }
    angular.module('app.controllers').controller('ExpenseNewController', expenseNewCtrl)
})();

(function () {

    'use strict';

    function supplierListController($scope, SupplierService, $route, $location, AlertService) {

        $scope.setLocationTitle('Fornecedores');

        $scope.tableDef = {
            structure: [
                { header: 'Fornecedor', cell: 'name', altCell: 'Sem nome'},
                { header: 'Endereço', cell: 'address', altCell: 'Sem endereço'},
                { header: 'Cidade', cell: 'city', altCell: 'Sem cidade'},
                { header: 'Telefone', cell: 'phone_number', altCell: 'Sem telefone'}
            ],
            actions: {
                edit: {
                    onClickFunction: editSupplier
                },
                remove: {
                    onClickFunction: removeSupplier
                }
            },
            items: []
        };

        $scope.searchByParam = function(param) {

            SupplierService.getAll(param).
                success(function(suppliers) {

                    $scope.tableDef.items = angular.copy(suppliers);
                });
        };

        $scope.newSupplier = function() {

            $location.url('/supplier/new');

        };

        function editSupplier (supplier) {

            $location.url('/supplier/edit/' + supplier.id);
        }

        function removeSupplier(supplier) {

            SupplierService.remove(supplier.id)
                .success(function() {

                    $route.reload();
                    AlertService.addSuccess("Fornecedor removido com sucesso!");
                });
        }

        function fetchSuppliers() {

            SupplierService.getAll().
                success(function(suppliers) {

                    if(suppliers && suppliers.length > 0) {

                        $scope.tableDef.items = angular.copy(suppliers);
                    }
                });
        }

        fetchSuppliers();
    }

    angular.module('app.controllers').controller('SupplierListController', supplierListController);
})();

(function() {

    'use strict';

    function expenseList($scope, ExpenseService, $route, $modal, $location, AlertService) {

        $scope.tableDef = {
            structure: [
                { header: 'Nº Despesa', cell: 'id'},
                { header: 'Nome do Fornecedor', cell: 'supplier_name'},
                { header: 'Data', cell: 'created_at', type: 'date'},
                { header: 'Valor', cell: 'total'}
            ],
            actions: {
                remove: {
                    onClickFunction: removeExpense
                },
                view: {
                    onClickFunction: viewExpense
                }
            },
            items: []
        };

        $scope.searchByParam = function(param) {

            ExpenseService.getAll(param).
                success(function(expenses) {

                    $scope.tableDef.items = angular.copy(expenses);
                });
        };

        $scope.newExpense = function() {

            $location.url('/expense/new');
        };

        function viewExpense(expense) {

            console.log(expense.id);

            $location.url('/expense/view/' + expense.id);
        }

        function removeExpense(expense) {

            ExpenseService.remove(expense.id)
                .success(function() {

                    AlertService.addSuccess('Despesa removida com sucesso!');
                    $route.reload();
                });
        }

        function fetchExpenses() {

            ExpenseService.getAll().
                success(function(expenses) {

                    $scope.tableDef.items = angular.copy(expenses);
                });
        }

        fetchExpenses();
    }

    angular.module('app.controllers').controller('ExpenseListController', expenseList);
})();

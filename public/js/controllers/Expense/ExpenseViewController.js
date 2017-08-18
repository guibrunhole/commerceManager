(function() {

    'use strict';

    function expenseViewCtrl($scope, ExpenseService, $routeParams, $location) {

        $scope.expense = undefined;

        function loadExpense() {

          // console.log($routeParams.expenseId);

            ExpenseService.getById($routeParams.id)
                .success(function(expense) {

                    $scope.expense = expense;
                })
                .error(function() {

                    $location.url('/expense');
                });
        }

        loadExpense();

        $scope.back = function() {

            $location.url('/expense');
        };
    }

    angular.module('app.controllers').controller('ExpenseViewController', expenseViewCtrl);
})();

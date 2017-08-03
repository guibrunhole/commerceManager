(function() {

    'use strict';

    function clientEditCtrl($scope, $location, ClientService, $routeParams, AlertService) {

        $scope.client = {};

        $scope.cancel = function() {

            $location.url('/client');
        };

        $scope.update = function() {

            ClientService.update($routeParams.id, $scope.client)
                .success(function() {

                    AlertService.addSuccess('Cliente editado com sucesso!');
                    $location.url('/client');
                });
        };

        function load() {

            ClientService.getById($routeParams.id)
                .success(function(client) {

                    $scope.client = angular.copy(client);
                })
                .error(function() {

                    $location.url('/client');
                });
        }

        load();
    }

    angular.module('app.controllers').controller('ClientEditController', clientEditCtrl);
})();

(function() {

    'use strict';

    function clientNewCtrl($scope, $location, ClientService, AlertService) {

        $scope.client = {};

        $scope.cancel = function() {

            $location.url('/client');
        };

        $scope.save = function() {

            ClientService.add($scope.client)
                .success(function() {

                    AlertService.addSuccess('Cliente incluido com sucesso!');
                    $location.url('/client');
                });
        };
    }


    angular.module('app.controllers').controller('ClientNewController', clientNewCtrl);
})();

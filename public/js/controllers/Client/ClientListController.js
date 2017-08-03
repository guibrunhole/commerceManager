(function () {

    'use strict';

    function clientListController($scope, ClientService, $route, $location, AlertService) {

        $scope.setLocationTitle('Clientes');

        $scope.tableDef = {
            structure: [
                { header: 'Cliente', cell: 'name', altCell: 'Sem nome'},
                { header: 'Endereço', cell: 'address', altCell: 'Sem endereço'},
                { header: 'Cidade', cell: 'city', altCell: 'Sem cidade'},
                { header: 'Telefone', cell: 'phone_number', altCell: 'Sem telefone'}
            ],
            actions: {
                edit: {
                    onClickFunction: editClient
                },
                remove: {
                    onClickFunction: removeClient
                }
            },
            items: []
        };

        $scope.searchByParam = function(param) {

            ClientService.getAll(param).
                success(function(clients) {

                    $scope.tableDef.items = angular.copy(clients);
                });
        };

        $scope.newClient = function() {

            $location.url('/client/new');

        };

        function editClient (client) {

            $location.url('/client/edit/' + client.id);
        }

        function removeClient(client) {

            ClientService.remove(client.id)
                .success(function() {

                    $route.reload();
                    AlertService.addSuccess("Cliente removido com sucesso!");
                });
        }

        function fetchClients() {

            ClientService.getAll().
                success(function(clients) {

                    if(clients && clients.length > 0) {

                        $scope.tableDef.items = angular.copy(clients);
                    }
                });
        }

        fetchClients();
    }

    angular.module('app.controllers').controller('ClientListController', clientListController);
})();

/**
 * Created by asus on 26/06/2015.
 */
(function (){

    'use strict';

    function chartService($http, BASE_ADDRESS) {

        return {

            getQuantity: function (){

                return $http.get(BASE_ADDRESS + '/chart');

            }
        }
    }

    angular.module('app.services').factory('ChartService', ['$http', 'BASE_ADDRESS', chartService]);

})();

(function() {

    'use strict';

    function verifyLogin ($q, $location, LoginService, AlertService) {

        var deferred = $q.defer();

        LoginService.verifyLogin()
            .success(function(user){

                if (user !== '0') {

                    deferred.resolve();
                } else {
                    AlertService.addError('\u00c9 necess\u00e1rio efetuar o login!');
                    deferred.reject();
                    $location.url('/login');
                }
            });

        return deferred.promise;
    }

    function routesConfig($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: '/templates/views/login.html',
                controller: 'LoginController'
            })
            .when('/', {
                templateUrl: '/templates/views/main.html',
                controller: 'MainController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/client', {
                templateUrl: '/templates/views/Client/clientList.html',
                controller: 'ClientListController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/client/new', {
                templateUrl: '/templates/views/Client/clientNew.html',
                controller: 'ClientNewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/client/edit/:id', {
                templateUrl: '/templates/views/Client/clientEdit.html',
                controller: 'ClientEditController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/supplier', {
                templateUrl: '/templates/views/Supplier/supplierList.html',
                controller: 'SupplierListController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/supplier/new', {
                templateUrl: '/templates/views/Supplier/supplierNew.html',
                controller: 'SupplierNewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/supplier/edit/:id', {
                templateUrl: '/templates/views/Supplier/supplierEdit.html',
                controller: 'SupplierEditController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/product', {
                templateUrl: '/templates/views/Product/productList.html',
                controller: 'ProductListController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/product/new', {
                templateUrl: '/templates/views/Product/productNew.html',
                controller: 'ProductNewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/product/edit/:id', {
                templateUrl: '/templates/views/Product/productEdit.html',
                controller: 'ProductEditController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/user', {
                templateUrl: '/templates/views/User/userList.html',
                controller: 'UserListController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/user/new', {
                templateUrl: '/templates/views/User/userNew.html',
                controller: 'UserNewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/user/edit/:id', {
                templateUrl: '/templates/views/User/userEdit.html',
                controller: 'UserEditController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/expense', {
                templateUrl: '/templates/views/Expense/expenseList.html',
                controller: 'ExpenseListController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/expense/new', {
                templateUrl: '/templates/views/Expense/expenseNew.html',
                controller: 'ExpenseNewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/expense/view/:id', {
                templateUrl: '/templates/views/Expense/expenseView.html',
                controller: 'ExpenseViewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/order', {
                templateUrl: '/templates/views/Order/orderList.html',
                controller: 'OrderListController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/order/new', {
                templateUrl: '/templates/views/Order/orderNew.html',
                controller: 'OrderNewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/order/view/:orderId', {
                templateUrl: '/templates/views/Order/orderView.html',
                controller: 'OrderViewController',
                resolve: { loggedIn: verifyLogin }
            })
            .when('/order/edit/:orderId', {
                templateUrl: '/templates/views/Order/orderEdit.html',
                controller: 'OrderEditController',
                resolve: { loggedIn: verifyLogin }
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    angular.module('app').config(['$routeProvider', routesConfig]);

})();

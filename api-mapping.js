(function() {

    'use strict';

    module.exports = function(app, pool, passport){

        var ProductRepository = require('./repository/productRepository')(pool);
        var UserRepository = require('./repository/userRepository')(pool);
        var OrderRepository = require('./repository/orderRepository')(pool);
        var ClientRepository = require('./repository/clientRepository')(pool);
        var ChartRepository = require('./repository/chartRepository')(pool);

        var ProductModule = require('./modules/productModule')(ProductRepository);
        var UserModule = require('./modules/userModule')(UserRepository);
        var ClientModule = require('./modules/clientModule')(ClientRepository);
        var OrderModule = require('./modules/orderModule')(OrderRepository, ClientRepository, UserRepository);
        var ChartModule = require('./modules/chartModule')(ChartRepository);

        app.post('/login', passport.authenticate('local'), function(req, res) {
            delete req.user.password;
            res.send(req.user);
        });

        app.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });

        app.get('/loggedIn', function(req, res) {

            if(req.isAuthenticated()) {
                delete req.user.password;
                res.send(req.user);
            } else {
                res.send('0');
            }
        });

        function ensureAuthenticated(req, res, next) {

            if (req.isAuthenticated()) { return next(); }
            req.session.error = 'Você precisa se logar primeiro ;)';
            res.redirect('/');
        }

        // Product
        app.get('/product', ensureAuthenticated, ProductModule.getAll);
        app.post('/product', ensureAuthenticated, ProductModule.addNew);
        app.get('/product/:id', ensureAuthenticated, ProductModule.getById);
        app.put('/product/:id', ensureAuthenticated, ProductModule.update);
        app.delete('/product/:id', ensureAuthenticated, ProductModule.remove);

        // User
        app.get('/user', ensureAuthenticated, UserModule.getAll);
        app.post('/user', ensureAuthenticated, UserModule.addNew);
        app.get('/user/:id', ensureAuthenticated, UserModule.getById);
        app.put('/user/:id', ensureAuthenticated, UserModule.update);
        app.delete('/user/:id', ensureAuthenticated, UserModule.remove);

        // Client
        app.get('/client', ensureAuthenticated, ClientModule.getAll);
        app.post('/client', ensureAuthenticated, ClientModule.addNew);
        app.get('/client/:id', ensureAuthenticated, ClientModule.getById);
        app.put('/client/:id', ensureAuthenticated, ClientModule.update);
        app.delete('/client/:id', ensureAuthenticated, ClientModule.remove);

        // Order
        app.get('/order', ensureAuthenticated, OrderModule.getAll);
        app.post('/order', ensureAuthenticated, OrderModule.addNew);
        app.get('/order/:id', ensureAuthenticated, OrderModule.getById);
        app.put('/order/:id', ensureAuthenticated, OrderModule.update);
        app.delete('/order/:id', ensureAuthenticated, OrderModule.remove);
        app.get('/order/:id/pdf', ensureAuthenticated, OrderModule.getAsPdf);

        // Chart
        app.get('/chart', ensureAuthenticated, ChartModule.getQuantity);

        app.use(function (req, res, next) {
            res.status(404).send('Página não encontrada.');
        });

        app.use(function (err, req, res, next) {
            console.log(err);
            res.status(500).send('Um erro inesperado ocorreu. Por favor, entre em contato com um administrador do sistema.');
        });
    }
})();

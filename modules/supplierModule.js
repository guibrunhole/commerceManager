(function() {

    'use strict';

    module.exports = function(supplierRepository) {

        return {
            getAll: function(req, res, next) {

                supplierRepository.getAll(req.query.searchParam).then(function(results) {

                    res.send(results);
                }, function(err) {

                    next(err);
                });
            },
            addNew: function(req, res, next) {

                supplierRepository.add(req.body).then(function(createdSupplierId) {

                    res.send('Supplier created with Id: ' + createdSupplierId);
                }, function(err) {

                    next(err);
                });
            },
            getById: function(req, res, next) {

                supplierRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1)
                        res.status(404).send('Supplier not found :(');
                    else
                        res.send(result[0]);
                }, function(err) {

                    next(err);
                });
            },
            update: function(req, res, next) {

                supplierRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('Supplier not found :(');
                    } else {

                        supplierRepository.update(req.params.id, req.body).then(function () {

                            res.send('Supplier updated!');
                        }, function (err) {

                            errorThrown(err);
                        });
                    }
                }, function(err) {

                    next(err);
                });
            },
            remove: function(req, res, next) {

                supplierRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('Supplier not found :(');
                    } else {

                        supplierRepository.removeById(req.params.id).then(function() {

                            res.send('Supplier removed!');
                        }, function(err) {

                            errorThrown(err);
                        });
                    }
                }, function(err) {

                    next(err);
                });
            }
        };
    };
})();

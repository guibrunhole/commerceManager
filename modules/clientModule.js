(function() {

    'use strict';

    module.exports = function(clientRepository) {

        return {
            getAll: function(req, res, next) {

                clientRepository.getAll(req.query.searchParam).then(function(results) {

                    res.send(results);
                }, function(err) {

                    next(err);
                });
            },
            addNew: function(req, res, next) {

                clientRepository.add(req.body).then(function(createdClientId) {

                    res.send('Client created with Id: ' + createdClientId);
                }, function(err) {

                    next(err);
                });
            },
            getById: function(req, res, next) {

                clientRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1)
                        res.status(404).send('Client not found :(');
                    else
                        res.send(result[0]);
                }, function(err) {

                    next(err);
                });
            },
            update: function(req, res, next) {

                clientRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('Client not found :(');
                    } else {

                        clientRepository.update(req.params.id, req.body).then(function () {

                            res.send('Client updated!');
                        }, function (err) {

                            errorThrown(err);
                        });
                    }
                }, function(err) {

                    next(err);
                });
            },
            remove: function(req, res, next) {

                clientRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('Client not found :(');
                    } else {

                        clientRepository.removeById(req.params.id).then(function() {

                            res.send('Client removed!');
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

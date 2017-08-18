(function() {

    'use strict';

    module.exports = function(expenseRepository) {

        return {

            getAll: function(req, res, next) {

                expenseRepository.getAll(req.query.searchParam).then(function(results) {

                    res.send(results);
                }, function(err) {

                    next(err);
                });
            },
            addNew: function(req, res, next) {

                expenseRepository.add(req.body).then(function(createdExpenseId) {

                    res.send('Expense created with Id: ' + createdExpenseId);
                }, function(err) {

                    next(err);
                });
            },
            remove: function(req, res, next) {

                expenseRepository.getById(req.params.id).then(function(result) {

                    if(!result) {

                        res.status(404).send('Expense not found :(');
                    } else {

                        expenseRepository.removeById(req.params.id)
                            .then(function() {

                                res.send('Expense removed!');
                            }, function(err) {

                                next(err);
                            });
                    }
                }, function(err) {

                    next(err);
                });
            },
            getById: function(req, res, next) {

                expenseRepository.getById(req.params.id).then(function(result) {

                    if(!result)
                        res.status(404).send('Expense not found :(');
                    else
                        res.send(result);
                }, function(err) {

                    next(err);
                });
            }
        };
    };
})();

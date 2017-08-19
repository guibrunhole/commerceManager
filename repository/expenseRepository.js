(function() {

    'use strict';

    var q = require('q');

    var EXPENSE_DETAIL_INSERT = 'INSERT INTO expense_details (expense_id, product_quantity, product_name, product_price, product_unity) ' +
        'VALUES (?, ?, ?, ?, ?);';

    module.exports = function(dbPool) {

        function queryFromPool(queryCallback) {
            var deferred = q.defer();

            dbPool.getConnection(function(connectionError, connection){

                if(connectionError) {

                    deferred.reject(connectionError);
                } else {
                    queryCallback(deferred, connection);
                    connection.release();
                }
            });

            return deferred.promise;
        }

        return {
            getAll: function(searchParam) {

                var query = 'select o.id, c.id as supplier_id, c.name as supplier_name, o.created_at, sum(ed.product_price*ed.product_quantity) total from expense o ' +
                    'INNER JOIN supplier c ON o.supplier_id = c.id '+
                    'inner join expense_details ed on o.id = ed.expense_id '+
                    'group by 1,2,3,4;';

                var queryParams = [];

                if(searchParam) {
                    query = query + ' WHERE c.name like ?';
                    queryParams = ['%' + searchParam + '%'];
                }

                return queryFromPool(function(deferred, connection) {

                    connection.query(query, queryParams, function(queryError, rows) {

                        if(queryError)
                            deferred.reject(queryError);
                        else
                            deferred.resolve(rows);
                    });
                });
            },
            add: function(newExpense) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('INSERT INTO expense (supplier_id, user_id, obs, created_at) VALUES (?, ?, ?, ?);',
                        [newExpense.supplierId, 1, newExpense.obs || null, new Date()],
                        function(queryError, resultInfo) {

                            if(queryError)
                                deferred.reject(queryError);
                            else {

                                var expenseDetailQuery = '';
                                var expenseDetailQueryParams = [];

                                for(var i = 0; i < newExpense.products.length; i++) {
                                    var product = newExpense.products[i];
                                    expenseDetailQuery = expenseDetailQuery + EXPENSE_DETAIL_INSERT;

                                    var productParams = [resultInfo.insertId, product.quantity, product.name, product.price, product.unity];

                                    expenseDetailQueryParams = expenseDetailQueryParams.concat(productParams);
                                }

                                if(newExpense.products.length > 0) {

                                    connection.query(expenseDetailQuery, expenseDetailQueryParams, function(queryError, result) {

                                        if(queryError)
                                            deferred.reject(queryError);
                                        else
                                            deferred.resolve(resultInfo.insertId);
                                    });
                                } else {
                                    deferred.resolve(resultInfo.insertId);
                                }
                            }

                        });
                });
            },
            getById: function(expenseId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('select o.obs as obs, c.id as supplier_id, c.name as supplier_name, o.created_at ' +
                        'from expense o inner join supplier c where c.id = o.supplier_id and o.id = ?;',
                        [expenseId], function(queryError, row) {

                            if(queryError) {

                                deferred.reject(queryError);
                            } else {

                                var expense = row[0];

                                // console.log(expense);

                                connection.query('select product_name as name, product_quantity as quantity, ' +
                                    'product_price as price, product_unity as unity from expense_details ' +
                                    'where expense_id = ?;',
                                    [expenseId], function(innerQueryError, results) {

                                        if(innerQueryError) {

                                            deferred.reject(innerQueryError);
                                        } else {

                                            expense.expenseDetails = results;
                                            deferred.resolve(expense);
                                        }
                                    });
                            }
                        });
                });
            },
            removeById: function(expenseId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('DELETE FROM expense_details where expense_id = ?; DELETE FROM expense WHERE id = ?;', [expenseId, expenseId], function(queryError) {

                        if(queryError)
                            deferred.reject(queryError);
                        else
                            deferred.resolve();
                    });
                });
            }
        };
    };
})();

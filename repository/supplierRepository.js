(function() {

    'use strict';

    var q = require('q');

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

                var query = 'SELECT * FROM supplier';
                var queryParams = [];

                if(searchParam) {
                    query = query + ' WHERE name like ?';
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
            add: function(newSupplier) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('INSERT INTO supplier (name, user_id, cnpj, address, city, state, zipcode, phone_number) ' +
                                        'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [newSupplier.name, newSupplier.user_id || null, newSupplier.cnpj, newSupplier.address, newSupplier.city,
                            newSupplier.state, newSupplier.zipcode || null, newSupplier.phone_number], function(queryError, resultInfo) {

                            if(queryError)
                                deferred.reject(queryError);
                            else
                                deferred.resolve(resultInfo.insertId);
                        });
                });
            },
            getById: function(supplierId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('SELECT * FROM supplier WHERE id = ?', [supplierId], function(queryError, row) {

                        if(queryError)
                            deferred.reject(queryError);
                        else
                            deferred.resolve(row);
                    });
                });
            },
            update: function(supplierId, updatedSupplier) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('UPDATE supplier SET name = ?, user_id = ?, cnpj = ?' +
                        ', address = ?, city = ?, state = ?, zipcode = ?, phone_number = ?' +
                        ' WHERE id = ?',
                        [updatedSupplier.name, updatedSupplier.user_id || null, updatedSupplier.cnpj,
                            updatedSupplier.address, updatedSupplier.city, updatedSupplier.state, updatedSupplier.zipcode || null,
                            updatedSupplier.phone_number ,supplierId], function(queryError) {

                            if(queryError)
                                deferred.reject(queryError);
                            else
                                deferred.resolve();
                        });
                });
            },
            removeById: function(supplierId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('DELETE FROM supplier WHERE id = ?', [supplierId], function(queryError) {

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

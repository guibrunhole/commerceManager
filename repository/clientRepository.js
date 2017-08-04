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

                var query = 'SELECT * FROM client';
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
            add: function(newClient) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('INSERT INTO client (name, user_id, cnpj, address, city, state, zipcode, phone_number, responsible_buyer, state_registration) ' +
                                        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [newClient.name, newClient.user_id || null, newClient.cnpj, newClient.address, newClient.city,
                            newClient.state, newClient.zipcode || null, newClient.phone_number, newClient.responsible_buyer, newClient.state_registration], function(queryError, resultInfo) {

                            if(queryError)
                                deferred.reject(queryError);
                            else
                                deferred.resolve(resultInfo.insertId);
                        });
                });
            },
            getById: function(clientId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('SELECT * FROM client WHERE id = ?', [clientId], function(queryError, row) {

                        if(queryError)
                            deferred.reject(queryError);
                        else
                            deferred.resolve(row);
                    });
                });
            },
            update: function(clientId, updatedClient) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('UPDATE client SET name = ?, user_id = ?, cnpj = ?' +
                        ', address = ?, city = ?, state = ?, zipcode = ?, phone_number = ?, responsible_buyer = ?' +
                        ', state_registration = ? WHERE id = ?',
                        [updatedClient.name, updatedClient.user_id || null, updatedClient.cnpj,
                            updatedClient.address, updatedClient.city, updatedClient.state, updatedClient.zipcode || null,
                            updatedClient.phone_number, updatedClient.responsible_buyer, updatedClient.state_registration ,clientId], function(queryError) {

                            if(queryError)
                                deferred.reject(queryError);
                            else
                                deferred.resolve();
                        });
                });
            },
            removeById: function(clientId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('DELETE FROM client WHERE id = ?', [clientId], function(queryError) {

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

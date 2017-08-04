(function() {

    'use strict';

    var express = require('express');
    var session = require('express-session');
    var path = require('path');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var cors = require('cors');
    var passport = require('passport');

    var mysql = require('mysql');
    var pool  = mysql.createPool({
        connectionLimit : 30,
        host: process.env.DBHOST || 'localhost',
        user: process.env.DBUSER || 'commerce',
        // password : process.env.DBPASS || '',
        port : process.env.DBPORT || 3306,
        // database: process.env.DBNAME || 'commerce_manager',
        database: 'commerce_manager',
        multipleStatements: true
    });

    require('./passport-config')(passport, pool);

    var app = express();

    app.use('/', express.static(__dirname + '/public'));
    app.use('/temp', express.static(__dirname + '/temp'));

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(session({
        secret: 'flying monkey',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    require('./api-mapping')(app, pool, passport);

    var server = app.listen(process.env.SV_PORT || 3030, function () {

        console.log('I\'m running here bro %s! Go check me out ;)', server.address().port);
    });
})();

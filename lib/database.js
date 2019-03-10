'use strict';
var mongoose = require('mongoose'),
    seeder = require('./dataSeeder');
mongoose.Promise = global.Promise;

var database = function () {
    var conn = null,

        init = function (config) {
            console.log('Trying to connect to ' + config.host + '/' + config.database + ' MongoDB database');
            var options = {
                promiseLibrary: global.Promise
            };

            var connString = `mongodb://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.host}:27017/${config.database}`;
            mongoose.connect(connString, options);
            conn = mongoose.connection;
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', function() {
                console.log('db connection open');
                //Set NODE_ENV to 'development' and uncomment the following if to only run
                //the seeder when in dev mode
                //if (process.env.NODE_ENV === 'development') {
                //  seeder.seed();
                //} 
                seeder.seed();
            });
            return conn;
        },

        close = function() {
            if (conn) {
                conn.close(function () {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            }
        }

    return {
        init:  init,
        close: close
    };

}();

module.exports = database;

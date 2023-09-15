'use strict';
const   mongoose = require('mongoose'),
        seeder = require('./dataSeeder');
mongoose.Promise = global.Promise;

const database = function () {
    var conn = null,
        seeded = false,

        init = async (config) => {
            console.log('Trying to connect to ' + config.host + '/' + config.database + ' MongoDB database');
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            // #######
            //  If using Kubernetes we could pull the password from an env variable set via a Secret
            //  That's actually done in the .k8s/mongo.deployment.yml file if you're interested in seeing it in action
            //  Keeping it simple here on purpose
            // #######
            const connStr = `mongodb://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.host}:27017/${config.database}`;
            conn = mongoose.connection;
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', () => {
                console.log('db connection open');
                //Set NODE_ENV to 'development' and uncomment the following if to only run
                //the seeder when in dev mode
                //if (process.env.NODE_ENV === 'development') {
                //  seeder.seed();
                //} 
                
                // simple check just to make sure we don't accidentally seed multiple times
                if (!seeded) {
                    seeded = true;
                    seeder.seed();
                }
            });
            try {
                await mongoose.connect(connStr, options)
            } catch (error) {
                console.error('Error connecting to MongoDB:', error);
            }
            return conn;
        },

        close = () => {
            if (conn) {
                conn.close(() => {
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

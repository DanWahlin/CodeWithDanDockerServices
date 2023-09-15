'use strict';
var redis = require('redis'),
    logger = require('./logger'),
    config = require('./configLoader');

var redisClient = function () {

    let client = null,
        redisConfig = config.redisConfig,

        connect = async () => {
            if (client && client.isReady) {
                logger.log('Redis client already connected');
                return client;
            }

            client = redis.createClient({
                url: `redis://:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`
            });

            try {
                await client.connect();
            }
            catch (err) {
                logger.log('Error connecting to Redis: ', err);
            }

            logger.log('Redis port: ', redisConfig.port);
            logger.log('Redis host: ', redisConfig.host);
            logger.log('Redis connected? ', client.isReady);

            return client;
        },
        close = () => {
            client.quit();
        }

    return {
        connect: connect,
        close: close
    };

}();

module.exports = redisClient;


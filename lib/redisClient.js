'use strict';

const redis = require('redis');
const config = require('./configLoader');

let client = null;

/**
 * Redis client module for cache management
 */
const redisClient = {
    /**
     * Connect to Redis server
     * @returns {Promise<RedisClient>} Redis client instance
     */
    async connect() {
        if (client && client.isReady) {
            console.log('Redis client already connected');
            return client;
        }

        const { host, port, password } = config.redisConfig;
        
        client = redis.createClient({
            url: `redis://:${password}@${host}:${port}`
        });

        try {
            await client.connect();
            console.log(`Redis connected to ${host}:${port}`);
        } catch (err) {
            console.error('Error connecting to Redis:', err);
        }

        return client;
    },

    /**
     * Close Redis connection
     */
    close() {
        if (client) {
            client.quit();
        }
    }
};

module.exports = redisClient;



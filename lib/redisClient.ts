import redis from 'redis';
import config from './configLoader.js';
import type { CustomRedisClient } from '../types.js';

let client: CustomRedisClient | null = null;

/**
 * Redis client module for cache management
 */
const redisClient = {
    /**
     * Connect to Redis server
     * @returns {Promise<CustomRedisClient>} Redis client instance
     */
    async connect(): Promise<CustomRedisClient> {
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
    close(): void {
        if (client) {
            client.quit();
        }
    }
};

export default redisClient;

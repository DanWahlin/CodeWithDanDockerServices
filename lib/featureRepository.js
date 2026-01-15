'use strict';

const Feature = require('../models/feature');
const redisClient = require('./redisClient');

const CACHE_KEY = 'features';
const CACHE_EXPIRY = 30; // seconds

/**
 * Repository for managing features with Redis caching
 */
const featureRepository = {
    /**
     * Get all featured items with Redis caching
     * @returns {Promise<Array>} List of features
     */
    async getFeatures() {
        try {
            const client = await redisClient.connect();
            
            // Check cache first
            const cachedFeatures = await client.get(CACHE_KEY);
            if (cachedFeatures) {
                console.log('Retrieved features from Redis cache');
                return JSON.parse(cachedFeatures);
            }
            
            // Cache miss - fetch from database
            console.log('Fetching features from MongoDB');
            const features = await Feature.find({ isFeatured: true })
                .sort({ position: 'asc' })
                .exec();
            
            // Update cache
            await client.set(CACHE_KEY, JSON.stringify(features));
            await client.expire(CACHE_KEY, CACHE_EXPIRY);
            console.log('Cached features in Redis');
            
            return features;
        } catch (err) {
            console.error('Error retrieving features:', err);
            throw err;
        }
    }
};

module.exports = featureRepository;



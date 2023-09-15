'use strict';

const   Feature     = require('../models/feature'),
        redisClient = require('./redisClient'),
        logger      = require('./logger');

const featureRepository = function() {

    const getFeatures = async (callback) => {
      
        const CACHE_KEY = 'features';
        const client = await redisClient.connect();
        
            //Check cache for features
            const features = await client.get(CACHE_KEY);
            if (features) {
                logger.log('Retrieved features data from Redis cache...');
                callback(null, JSON.parse(features));
            }
            else {
                //No features in cache so call DB and update Redis cache
                Feature.find({ 'isFeatured' : true })
                    .sort({ position: 'asc' })
                    //.select("position title text highlightText backgroundImageUrl productId link linkText customCssClass transparentBackground")
                    // .populate('sku')
                    .exec()
                    .then(async features => {
                        logger.log('Retrieved features data from MongoDB...');
                        await client.set(CACHE_KEY, JSON.stringify(features));
                        client.expire(CACHE_KEY, 30);
                        logger.log('Added features data to Redis cache...');
                        callback(null, features);
                    })
                    .catch(err => {
                        logger.log('Error retrieving features data from MongoDB: ', err.message);
                        callback(err, null);
                    });                   
            }
    };

    return {
        getFeatures: getFeatures
    };

}();

module.exports = featureRepository;


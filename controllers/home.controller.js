'use strict';

const featureRepository = require('../lib/featureRepository');

module.exports = (router) => {
    router.get('/', async (req, res, next) => {
        try {
            const features = await featureRepository.getFeatures();
            res.render('index', { features });
        } catch (err) {
            next(err);
        }
    });
};




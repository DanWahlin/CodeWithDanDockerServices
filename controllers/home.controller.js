'use strict';

const featureRepository = require('../lib/featureRepository');

module.exports = (router) => {

    router.get('/', (req, res, next) => {

        featureRepository.getFeatures((err, features) => {

            if (err) return next(err);

            res.render('index', {
                features: features
            });
        });

    });
};



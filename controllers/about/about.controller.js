'use strict';

module.exports = (router) => {
    router.get('/', (req, res) => {
        res.render('about');
    });
};

"use strict";

const ProductType = require("../models/productType");

const productTypeRepository = function () {

    let productTypes = null;

    const getProductTypes = (callback) => {
        ProductType.find()
            .sort({ title: "asc" })
            .exec()
            .then(pts => {
                callback(null, pts);
            })
            .catch(err => {
                callback(err, null);
            });
    },

        getProductTypeById = (id, callback) => {

            ProductType.findById(id)
                .then(productType => {
                    callback(null, productType);
                })
                .catch(err => {
                    callback(err, null);
                });

        },

        getProductTypeByTitle = (title, callback) => {

            ProductType.findOne({ title: { $regex: title, $options: "i" } })
                .then(productType => {
                    callback(null, productType);
                })
                .catch(err => {
                    callback(err, null);
                });

        },

        injectProductTypes = (req, res, next) => {
            if (!productTypes) {
                getProductTypes((err, pts) => {
                    if (!err) {
                        productTypes = pts;
                        res.locals.productTypes = productTypes;
                    }
                });
            }
            else {
                res.locals.productTypes = productTypes;
            }
            next();
        };

    return {
        getProductTypes: getProductTypes,
        getProductTypeById: getProductTypeById,
        getProductTypeByTitle: getProductTypeByTitle,
        injectProductTypes: injectProductTypes
    };
}();

module.exports = productTypeRepository;

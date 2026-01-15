'use strict';

const ProductType = require('../models/productType');

let productTypes = null;

/**
 * Repository for managing product types
 */
const productTypeRepository = {
    /**
     * Get all product types
     * @returns {Promise<Array>} List of product types
     */
    async getProductTypes() {
        try {
            return await ProductType.find().sort({ title: 'asc' }).exec();
        } catch (err) {
            console.error('Error fetching product types:', err);
            throw err;
        }
    },

    /**
     * Get product type by ID
     * @param {string} id - Product type ID
     * @returns {Promise<Object>} Product type object
     */
    async getProductTypeById(id) {
        try {
            return await ProductType.findById(id);
        } catch (err) {
            console.error(`Error fetching product type by ID ${id}:`, err);
            throw err;
        }
    },

    /**
     * Get product type by title (case-insensitive)
     * @param {string} title - Product type title
     * @returns {Promise<Object>} Product type object
     */
    async getProductTypeByTitle(title) {
        try {
            return await ProductType.findOne({ 
                title: { $regex: title, $options: 'i' } 
            });
        } catch (err) {
            console.error(`Error fetching product type by title ${title}:`, err);
            throw err;
        }
    },

    /**
     * Middleware to inject product types into response locals
     */
    async injectProductTypes(req, res, next) {
        try {
            if (!productTypes) {
                productTypes = await productTypeRepository.getProductTypes();
            }
            res.locals.productTypes = productTypes;
            next();
        } catch (err) {
            console.error('Error injecting product types:', err);
            next();
        }
    }
};

module.exports = productTypeRepository;


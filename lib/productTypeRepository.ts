import { Request, Response, NextFunction } from 'express';
import ProductType from '../models/productType.js';
import type { IProductType } from '../types.js';

let productTypes: IProductType[] | null = null;

/**
 * Repository for managing product types
 */
const productTypeRepository = {
    /**
     * Get all product types
     * @returns {Promise<IProductType[]>} List of product types
     */
    async getProductTypes(): Promise<IProductType[]> {
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
     * @returns {Promise<IProductType | null>} Product type object
     */
    async getProductTypeById(id: string): Promise<IProductType | null> {
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
     * @returns {Promise<IProductType | null>} Product type object
     */
    async getProductTypeByTitle(title: string): Promise<IProductType | null> {
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
    async injectProductTypes(_req: Request, res: Response, next: NextFunction): Promise<void> {
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

export default productTypeRepository;

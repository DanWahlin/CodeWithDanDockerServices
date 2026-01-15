import mongoose, { Schema } from 'mongoose';
import { IProductType } from '../types.js';

const productTypeSchema = new Schema<IProductType>({
    title: { type: String, required: true },
    linkTitle: { type: String, required: false },
    iconCssClass: { type: String, required: false },
    description: { type: String, required: false }
});

const ProductTypeModel = mongoose.model<IProductType>('productType', productTypeSchema, 'productTypes');

export default ProductTypeModel;

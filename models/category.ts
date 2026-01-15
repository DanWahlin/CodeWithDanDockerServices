import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types.js';

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String, required: false }
});

const CategoryModel = mongoose.model<ICategory>('category', categorySchema, 'categories');

export default CategoryModel;

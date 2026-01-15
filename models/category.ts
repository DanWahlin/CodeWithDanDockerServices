import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types.js';

const categorySchema = new Schema<ICategory>({
    title: { type: String, required: false },
    name: { type: String, required: false },
    imageUrl: { type: String, required: false },
    cssClass: { type: String, required: false },
    description: { type: String, required: false }
});

const CategoryModel = mongoose.model<ICategory>('category', categorySchema, 'categories');

export default CategoryModel;

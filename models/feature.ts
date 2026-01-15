import mongoose, { Schema } from 'mongoose';
import { IFeature } from '../types.js';

const featureSchema = new Schema<IFeature>({
    isFeatured: { type: Boolean, required: true, default: true },
    position: { type: Number, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    highlightText: { type: String, required: false },
    backgroundImageUrl: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: false },
    link: { type: String, required: false },
    linkText: { type: String, required: false },
    customCssClass: { type: String, required: false },
    transparentBackground: { type: Boolean, required: false },
    date: { type: Date, default: Date.now }
});

const FeatureModel = mongoose.model<IFeature>('feature', featureSchema, 'features');

export default FeatureModel;

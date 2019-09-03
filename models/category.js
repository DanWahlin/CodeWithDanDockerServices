'use strict';

const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema;

const categorySchema = Schema({
    title	: { type: String },
    imageUrl: { type: String },
    cssClass: { type: String }
});

const CategoryModel = mongoose.model('category', categorySchema, 'categories');

module.exports = CategoryModel;






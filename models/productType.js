'use strict';

const   mongoose        = require('mongoose'),
        Schema          = mongoose.Schema,
        ObjectId        = Schema.ObjectId;

const productTypeSchema = Schema({
    title	        : { type: String },
    linkTitle       : { type: String },
    iconCssClass    : { type: String },
    description     : { type: String }
});

const ProductTypeModel = mongoose.model('productType', productTypeSchema, 'productTypes');


module.exports = ProductTypeModel;

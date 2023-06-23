const mongoose = require('../index'); //import mongoose connection instance from index.js
const initProductModel = require('shared-library/models/ProductModel'); //import shared Product Model
// initialize the product model with the mongoose instance
const Product = initProductModel(mongoose);
module.exports = Product;
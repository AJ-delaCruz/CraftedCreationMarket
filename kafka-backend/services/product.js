const mongoose = require('../server'); //import mongoose connection instance from server.js
const initProductModel = require('shared-library/models/ProductModel'); //import shared Product Model
// initialize the product model with the mongoose instance
const Product = initProductModel(mongoose);


// handle updates for the product quantity and sale after user order
const updateProductQuantity = async (order) => {
    console.log(order);
    const product = await Product.findById(order.productId);
    product.quantity -= order.quantity;
    product.sale += order.quantity;
    await product.save();
}

module.exports = { updateProductQuantity };
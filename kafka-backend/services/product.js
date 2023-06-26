const Product = require('../Models/ProductModel');


// handle updates for the product quantity and sale after user order
const updateProductQuantity = async (order) => {
    // console.log(order);
    const product = await Product.findById(order.productId);
    product.quantity -= order.quantity;
    product.sale += order.quantity;
    await product.save();
}

module.exports = { updateProductQuantity };
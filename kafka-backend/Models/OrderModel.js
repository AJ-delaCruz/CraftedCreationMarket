const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {

        userId: {type: String, required: true},
        productId: {type: String, required: true},
        title: {type: String, required: true,},
        img: {type: String},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    },
    {timestamps: true}
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;

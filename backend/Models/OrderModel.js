const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String, required: true, },
        img: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        status: {
            type: String, required: true,
            enum: ['pending', 'confirmed', 'shipped'],
            default: 'pending'
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;

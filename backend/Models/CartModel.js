const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);


const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;


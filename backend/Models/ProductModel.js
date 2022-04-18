const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        sellerId: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        categories: {type: Array},
        description: {type: String, required: true,},
        img: {type: String, required: true},
        price: {type: Number, required: true},

    },
    {
            versionKey: false
    }
);


const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
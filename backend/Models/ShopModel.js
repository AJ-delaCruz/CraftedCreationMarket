const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
    {
        sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
        name: { type: String, required: true, unique: true },

    },
    {
        versionKey: false
    }
);


const ShopModel = mongoose.model("Shop", ShopSchema);
module.exports = ShopModel;
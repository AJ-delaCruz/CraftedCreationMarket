const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        productId: {type: String, required: true},
        title: {type: String, required: true,},
        description: {type: String},
        img: {type: String},
        categories: {type: Array},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    },
    {timestamps: true}
);


const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);
module.exports = FavoriteModel;


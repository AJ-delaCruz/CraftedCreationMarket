const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        productId: {type: String, required: true},
    },
    {timestamps: true}
);


const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);
module.exports = FavoriteModel;


const initProductModel = (mongoose) => {
    const ProductSchema = new mongoose.Schema(
        {
            sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
            // shopName: { type: String, required: true },
            title: { type: String, required: true, },
            description: { type: String },
            img: { type: String },
            categories: { type: Array },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            inStock: { type: Boolean },
            sale: { type: Number, default: 0 }

        },
        {
            versionKey: false,
            timestamps: true
        }

    );

    return mongoose.model("Product", ProductSchema);
};

module.exports = initProductModel;

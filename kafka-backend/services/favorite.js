const Product = require("../Models/ProductModel");


//Favorite
async function handle_request(msg, callback) {
    console.log("Inside Favorite product kafka backend");
    console.log(msg);
    let res = {};
    // console.log("In handle request:" + JSON.stringify(msg));
    console.log("INSIDE PRODUCT FAVORITE POST");
    try {
        const addFavorite = await Product.findByIdAndUpdate(
            msg.id,
            {
                $push: {favorites: msg.username},
            },
            {new: true}
        );

        // const product = await Product.findById(req.params.id);
        // product.insert(req.body);

        console.log("SUCCESS ADDED FAVORITE PRODUCT")
        // res.status(200).json(addFavorite);
        callback(null, addFavorite);
    } catch (err) {
        console.log("ERROR FAVORITE PRODUCT");
        // res.status(500).json(err);
        callback(err, "ERROR FAVORITE PRODUCT");
    }

}

exports.handle_request = handle_request;

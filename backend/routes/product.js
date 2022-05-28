"use strict";
const express = require("express");
const router = express.Router();
const Product = require("../Models/ProductModel");
const Order = require("../Models/OrderModel");
const Favorite = require("../Models/FavoriteModel");
const kafka = require("../kafka/client");


//create product
router.post("/create", async (req, res) => {
    console.log("INSIDE PRODUCT POST");
    // console.log(req.body)
    console.log(req.body.userId);
    console.log(req.body.shopName);
    const newProduct = new Product({
        sellerId: req.body.userId,
        shopName: req.body.shopName,
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        categories: req.body.categories,
        quantity: req.body.quantity,
        price: req.body.price,

    });
    console.log(newProduct);

    try {
        console.log("SUCCESS CREATING PRODUCT");
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.log("ERROR CREATING PRODUCT");
        res.status(500).json(err);
    }


});

//Update product
router.put("/update/:id", async (req, res) => {
    console.log("INSIDE PRODUCT PUT");

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        console.log("SUCCESS UPDATING PRODUCT")
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log("ERROR UPDATING PRODUCT");
        res.status(500).json(err);
    }
});

//DELETE product
router.delete("/delete/:id", async (req, res) => {
    console.log("INSIDE PRODUCT DELETE");

    try {
        await Product.findByIdAndDelete(req.params.id);
        console.log("SUCCESS DELETE PRODUCT")
        res.status(200).send("Product deleted");
    } catch (err) {
        console.log("ERROR DELETE PRODUCT")
        res.status(500).json(err);
    }
});

//GET product
router.get("/find/:id", async (req, res) => {
    console.log("INSIDE PRODUCT FIND");

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
        console.log("SUCCESS PRODUCT FIND")

    } catch (err) {
        console.log("ERROR PRODUCT FIND")
        res.status(500).json(err);
    }
});

//GET all product
router.get("/productList", async (req, res) => {
    console.log("INSIDE PRODUCT GET AlL");

    console.log(req.query);

    kafka.make_request('get_product', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                updatedList: results
            });

            res.end();
        }

    });
    // const query = req.query.new;
    // const categories = req.query.category;
    // const productName = req.query.title;
    // try {
    //     let products;
    //
    //     if (query) {
    //         products = await Product.find().sort({createdAt: -1}).limit(10);
    //     } else if (categories) {
    //         products = await Product.find({
    //             categories: {
    //                 $in: [categories], //list products with specific category
    //             },
    //         });
    //     } else if (productName) {
    //         products = await Product.find({
    //             title: {
    //                 $regex: productName,
    //             },
    //         });
    //     } else {
    //         products = await Product.find();
    //     }
    //
    //     console.log("SUCCESS PRODUCT GET");
    //     res.status(200).json(products);
    // } catch (err) {
    //     console.log("ERROR PRODUCT GET");
    //     res.status(500).json(err);
    // }
});

//GET seller products
router.get("/seller", async (req, res) => {
    console.log("INSIDE PRODUCT FIND");
    const sellerId = req.query.sellerId;
    try {
        const product = await Product.find({sellerId: sellerId});
        res.status(200).json(product);
        console.log("SUCCESS SELLER PRODUCT FIND")

    } catch (err) {
        console.log("ERROR PRODUCT FIND")
        res.status(500).json(err);
    }
});

//favorite
router.post("/favorites/:id", async (req, res) => {


    console.log("INSIDE PRODUCT FAVORITE POST");
    kafka.make_request('post_favorite', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                updatedList: results
            });

            res.end();
        }

    });

    // try {
    //     const addFavorite = await Product.findByIdAndUpdate(
    //         req.params.id,
    //         {
    //             $push: {favorites: req.body.username},
    //         },
    //         {new: true}
    //     );
    //
    //     // const product = await Product.findById(req.params.id);
    //     // product.insert(req.body);
    //
    //     console.log("SUCCESS ADDED FAVORITE PRODUCT")
    //     res.status(200).json(addFavorite);
    // } catch (err) {
    //     console.log("ERROR FAVORITE PRODUCT");
    //     res.status(500).json(err);
    // }
});


//GET favorite product
router.get("/favorite", async (req, res) => {
    console.log("INSIDE FAVORITE PRODUCT GET");
    const userId = req.query.userId;
    console.log(userId);

    const favorite = await Favorite.find({userId: req.query.userId});
    console.log("FAVORITES")
    console.log(favorite);


    try {
        const product =await Favorite.find({userId: req.query.userId});
        res.status(200).json(product);
        console.log("SUCCESS FAVORITE PRODUCT GET")

    } catch (err) {
        console.log("ERROR FAVORITE PRODUCT GET")
        res.status(500).json(err);
    }
});
module.exports = router;

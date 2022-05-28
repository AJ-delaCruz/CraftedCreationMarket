"use strict";
const Order = require("../Models/OrderModel")
const Product = require("../Models/ProductModel");


//create ORDER
async function handle_request(msg, callback) {
    console.log("Inside product kafka backend");
    console.log(msg);
    let res = {};

    //
    // console.log("INSIDE PRODUCT POST");
    // // console.log(req.body)
    // console.log(msg.body.userId);
    // console.log(msg.body.shopName);
    // const newProduct = new Product({
    //     sellerId: msg.body.userId,
    //     shopName: msg.body.shopName,
    //     title: msg.body.title,
    //     description: msg.body.description,
    //     img: msg.body.img,
    //     categories: msg.body.categories,
    //     quantity: msg.body.quantity,
    //     price: msg.body.price,
    //
    // });
    // console.log(newProduct);
    //
    // try {
    //     console.log("SUCCESS CREATING PRODUCT");
    //     const savedProduct = await newProduct.save();
    //     // res.status(200).json(savedProduct);
    //     callback(null, savedProduct);
    //     console.log("SUCCESS CREATING PRODUCT");
    // } catch (err) {
    //     console.log("ERROR CREATING PRODUCT");
    //     // res.status(500).json(err);
    //     callback(err, "ERROR CREATING PRODUCT");
    //
    // }
    console.log("INSIDE PRODUCT GET AlL");

    console.log(msg.title)
    // console.log(msg.categories)

    // const query = req.query.new;
    // const categories = req.query.category;
    // const productName = req.query.title;
    try {
        let products;

        if (msg.new) {
            products = await Product.find().sort({createdAt: -1}).limit(10);
        } else if (msg.categories) {
            products = await Product.find({
                categories: {
                    $in: [msg.query.category], //list products with specific category
                },
            });
        } else if (msg.title) {
            products = await Product.find({
                title: {
                    $regex: msg.query.title,
                },
            });
        } else {
            products = await Product.find();
        }
        // products = await Product.find();
        console.log("SUCCESS PRODUCT GET");
        // res.status(200).json(products);
        callback(null, products);
    } catch (err) {
        console.log("ERROR PRODUCT GET");
        // res.status(500).json(err);
        callback(err, "ERROR PRODUCT GET");
    }

}

exports.handle_request = handle_request;

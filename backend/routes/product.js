"use strict";
const express = require("express");
const router = express.Router();
const Product = require("../Models/ProductModel");


//create product
router.post("/create", async (req, res) => {
    console.log("INSIDE PRODUCT POST");
    const newProduct = new Product(req.body);

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
    console.log("INSIDE PRODUCT GET");

    const query = req.query.new;
    const categories = req.query.category;
    try {
        let products;

        if (query) {
            products = await Product.find().sort({createdAt: -1}).limit(10);
        } else if (categories) {
            products = await Product.find({
                categories: {
                    $in: [categories], //list products with specific category
                },
            });
        } else {
            products = await Product.find();
        }

        console.log("SUCCESS PRODUCT GET");
        res.status(200).json(products);
    } catch (err) {
        console.log("ERROR PRODUCT GET");
        res.status(500).json(err);
    }
});

module.exports = router;
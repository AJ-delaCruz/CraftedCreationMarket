"use strict";
const express = require("express");
const router = express.Router();
const Order = require("../Models/OrderModel");
const Product = require("../Models/ProductModel");


//create ORDER
router.post("/create", async (req, res) => {
    console.log("INSIDE ORDER POST");
    const orders = req.body.order;
    console.log(orders);
    console.log(req.body.userId);

    const newOrder = new Order({
        userId: req.body.userId,
        productId: orders._id,
        title: orders.title,
        img: orders.img,
        quantity: orders.quantity,
        price: orders.price,
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
        console.log("SUCCESS CREATING ORDER");
    } catch (err) {
        console.log("ERROR CREATING ORDER");
        res.status(500).json(err);
    }
});

//update order
router.put("/update/:id", async (req, res) => {
    console.log("INSIDE ORDER UPDATE");

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        console.log("SUCCESS UPDATING ORDER")
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.log("ERROR UPDATING ORDER");
        res.status(500).json(err);
    }
});

//DELETE ORDER
router.delete("/delete/:id", async (req, res) => {
    console.log("INSIDE ORDER DELETE");

    try {
        await Order.findByIdAndDelete(req.params.id);
        console.log("SUCCESS DELETE ORDER")
        res.status(200).send("ORDER deleted");
    } catch (err) {
        console.log("ERROR DELETE ORDER")
        res.status(500).json(err);
    }
});

//GET Order
router.get("/find/:userId", async (req, res) => {
    console.log("INSIDE GET ORDER");

    try {
        const orders = await Order.findById(req.params.userId);
        res.status(200).json(orders);
        console.log("SUCCESS GET ORDER ")

    } catch (err) {
        console.log("ERROR GET ORDER")
        res.status(500).json(err);
    }
});

//GET all Order
router.get("/orderList", async (req, res) => {
    console.log("INSIDE Order GET AlL");


    const userId = req.query.userId;
    console.log(userId);
    // const check = Order.find({});
    // console.log(check);
    try {
        const orders = await Order.find({userId:  req.query.userId});

        console.log("SUCCESS ORDER GET ALL");
        res.status(200).json(orders);
    } catch (err) {
        console.log("ERROR ORDER GET ALL");
        res.status(500).json(err);
    }
});

module.exports = router;

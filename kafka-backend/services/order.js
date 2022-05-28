"use strict";
const Order = require("../Models/OrderModel")


//create ORDER
async function handle_request(msg, callback) {
    console.log("Inside Order kafka backend");
    console.log(msg);
    let res = {};
    // console.log("In handle request:" + JSON.stringify(msg));
    console.log("INSIDE ORDER POST");
    const orders = msg;
    // const orders = JSON.stringify(msg);

    console.log(orders);
    console.log("PRdERS "+ orders.title);
    // console.log(req.body.userId);

    const newOrder = new Order({
        _id: msg._id,
        userId: msg.userId,
        productId: msg.productId,
        title: msg.title,
        img: msg.img,
        quantity: msg.quantity,
        price: msg.price,
    });
    console.log(newOrder);
    // await newOrder.save();
    try {
        const savedOrder = await newOrder.save();
        // res.status(200).json(savedOrder);
        callback(null,savedOrder);
        console.log("SUCCESS CREATING ORDER");
    } catch (err) {
        console.log("ERROR CREATING ORDER");
        // res.status(500).json(err);
        callback(err,"Error");
    }

}
exports.handle_request = handle_request;

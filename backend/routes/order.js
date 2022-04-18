"use strict";
const express = require("express");
const router = express.Router();
const Order = require("../Models/OrderModel");


//create ORDER
router.post("/create", async (req, res) => {
  console.log("INSIDE ORDER POST");
  const newOrder = new Order(req.body);

  try {
    console.log("SUCCESS CREATING ORDER");
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
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


module.exports = router;

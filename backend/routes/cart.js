"use strict";
const express = require("express");
const router = express.Router();
const Cart = require("../Models/CartModel");




//create CART
router.post("/create", async (req, res) => {
  console.log("INSIDE CART POST");
  const newCart = new Cart(req.body);

  try {
    console.log("SUCCESS CREATING CART");
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    console.log("ERROR CREATING CART");
    res.status(500).json(err);
  }
});

//update CART
router.put("/update/:id", async (req, res) => {
  console.log("INSIDE CART UPDATE");

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {new: true}
    );
    console.log("SUCCESS UPDATING CART")
    res.status(200).json(updatedCart);
  } catch (err) {
    console.log("ERROR UPDATING CART");
    res.status(500).json(err);
  }
});

//DELETE CART
router.delete("/delete/:id", async (req, res) => {
  console.log("INSIDE CART DELETE");

  try {
    await Cart.findByIdAndDelete(req.params.id);
    console.log("SUCCESS DELETE CART")
    res.status(200).send("CART deleted");
  } catch (err) {
    console.log("ERROR DELETE CART")
    res.status(500).json(err);
  }
});

//GET Cart
router.get("/find/:userId", async (req, res) => {
  console.log("INSIDE GET CART");

  try {
    const cart = await Cart.findById(req.params.userId);
    res.status(200).json(cart);
    console.log("SUCCESS GET CART ")

  } catch (err) {
    console.log("ERROR GET CART")
    res.status(500).json(err);
  }
});



module.exports = router;

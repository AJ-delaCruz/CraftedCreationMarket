"use strict";
const express = require("express");
const router = express.Router();
const Shop = require('../Models/ShopModel');

//create shop
router.post('/create', async (req, res) => {
    console.log("Inside SiGN UP POST");

    const newShop = new Shop(req.body);
    console.log(req.body.shopName);


    Shop.findOne({shopName: req.body.shopName}, (err, shopTaken) => {
        if (err) {
            console.log(err);
            console.log("ERROR CREATING SHOP")
            res.status(500).json(err);
        }
        if (shopTaken) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("SHOP already exists");
        } else {
            newShop.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                } else {
                    console.log("POST SHOP up works");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(data);
                }
            });
        }
    });


});



//update profile
router.put("/update/:id", async (req, res) => {

    try {
        const updateShop = await Shop.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        console.log("SHOP update works");
        res.status(200).json(updateShop);
        res.end("Successful SHOP UPDATE");
    } catch (err) {
        console.log(err);
        console.log("ERROR SHOP PROFILE");
        res.status(500).json(err);

    }


});


module.exports = router;
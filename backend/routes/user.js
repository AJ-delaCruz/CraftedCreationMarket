"use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
const User = require('../Models/UserModel');
const { auth } = require("../utils/passport");
const bcrypt = require('bcrypt');

// auth();

//signup
router.post('/signup', async (req, res) => {
    console.log("Inside SiGN UP POST");

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: passwordHash,

    });

    console.log(req.body.username);
    console.log(req.body.password);

    User.findOne({ username: req.body.username }, (err, userTaken) => {
        if (err) {
            console.log(err);
            console.log("ERROR SIGNING UP");
            res.status(500).send({ err });
        }
        if (userTaken) {
            res.status(409).send("Username already exists");
        } else {
            newUser.save((error, data) => {
                if (error) {
                    res.status(500).send({ error });
                } else {
                    console.log("sign up works");
                    res.status(200).send(data);
                }
            });
        }
    });


});


//login
router.post('/login', async (req, res) => {

    console.log("INSIDE LOGIN");
    const usernameValue = req.body.username;
    const passwordValue = req.body.password;
    console.log(usernameValue);
    console.log(passwordValue);

    User.findOne({ username: req.body.username }, async (error, user) => {
        if (error) {
            console.log("LOGIN NOT WORKING");
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error Occurred");
        }
        if (user) {
            console.log("Username found");

            await bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send({ error: err });
                }
                if (result) {
                    // if (!credentialsValid) {
                    //     throw new Error('Invalid credentials.');
                    // }
                    console.log("SUCCESSFUL LOGIN");
                    //jwt
                    const payload = { _id: user._id, username: user.username, };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.status(200).end("JWT " + token);
                } else {
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials. Wrong username or password");
                }
            });
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials. Wrong username or password");
            console.log("wrong username");
        }
    });


});


//update profile
router.put("/update", async (req, res) => {
    const currentUser = await User.findById(req.body.userId);
    console.log(currentUser);
    const newUser = { ...req.body };
    console.log(newUser);

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.body.userId,
            {
                $set:
                    // name: req.body.name,
                    // img: req.body.image,
                    // street: req.body.street,
                    // city: req.body.city,
                    // state: req.body.state,
                    // country: req.body.country,
                    // zipCode: req.body.zipCode,
                    // email: req.body.email,
                    // phoneNum: req.body.phoneNum,
                    // birthDay: req.body.birthDay,
                    newUser

            },
        );
        console.log("profile update works");
        res.status(200).json(updateUser);
        res.end("Successful PROFILE UPDATE");
    } catch (err) {
        console.log(err);
        console.log("ERROR UPDATING PROFILE");
        res.status(500).json(err);

    }


});


//find user details
router.get("/find", async (req, res) => {
    console.log("INSIDE USER FIND");
    const userId = req.query.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
        console.log("SUCCESS GET USER")

    } catch (err) {
        console.log("ERROR GET USER");
        res.status(500).json(err);
    }
});

//create shop
router.put("/createShop", async (req, res) => {
    console.log("INSIDE SHOP Create");
    const userId = req.body.userId;
    const newShop = req.body.shopName;

    console.log(userId);
    console.log(newShop);
    try {
        const shopExist = await User.findOne({ shopName: newShop });
        console.log(shopExist);
        if (!shopExist) {
            const createShop = await User.findByIdAndUpdate(
                userId, { shopName: newShop }, { new: true }
            )
            console.log("new shop created successfully");
            res.status(200).send(createShop);
        } else {
            res.status(400).send("Shop Name already exists");
        }
    } catch (err) {
        res.status(409).send(err);
    }
});


module.exports = router;
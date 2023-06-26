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

    try {
        const { email, username, password } = req.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            email,
            username,
            password: passwordHash,

        });

        console.log(username);
        console.log(password);

        const userTaken = await User.findOne({ username });
        // console.log(username);
        if (userTaken) {
            // conflict
            res.status(409).json({ message: 'Username is taken' });
            console.log('Username is taken');
        } else {
            // create user
            await newUser.save();
            // Return a success response to the client
            res.status(201).json({ message: 'Registration Successful' });
            // console.log(`signed up: ${newUser.username}`);
        }
    } catch (err) {
        // Handle errors and return an error response to the client
        console.log(err);
        res.status(500).json({ message: err.message });
    }

});


//login
router.post('/login', async (req, res) => {

    console.log("INSIDE LOGIN");
    const { username, password } = req.body;
    console.log(req.body);
    console.log(username);

    try {
        const user = await User.findOne({ username });
        console.log(username);


        if (!user) {
            // not found
            res.status(401).json({ message: 'Invalid Credentials. Wrong username or password' });
            console.log('wrong username');
            return;
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({ message: 'Invalid credentials' });
            console.log('wrong password');
            return;
        }

        // console.log('SUCCESSFUL LOGIN');

        // Generate a JWT token
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
        });
        // console.log(token);
        // Return a token as response to the client
        res.status(200).json({ token });
    } catch (error) {
        // console.log('LOGIN NOT WORKING');
        res.status(500).json({ message: error });
    }

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

    try {
        const userId = req.query.userId;
        console.log("USERID: " + userId);
        if (!userId || userId === "null") {
            return res.status(404).json("no user logged in");
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("no user found with this ID");
        }
        res.status(200).json(user);
        console.log("SUCCESS GET USER")

    } catch (err) {
        console.log("ERROR GET USER: ", err);
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
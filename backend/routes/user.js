"use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const {secret} = require('../Utils/config');
const User = require('../Models/UserModel');
const {auth} = require("../utils/passport");
auth();

//signup
router.post('/signup', async (req, res) => {
    console.log("Inside SiGN UP POST");

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,

    });

    console.log(req.body.username);
    console.log(req.body.password);

    User.findOne({username: req.body.username}, (err, userTaken) => {
        if (err) {
            console.log(err);
            console.log("ERROR SIGNING UP");
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        if (userTaken) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Username already exists");
        } else {
            newUser.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                } else {
                    console.log("sign up works");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(data);
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

    User.findOne({username: req.body.username, password: req.body.password}, (error, user) => {
        if (error) {
            console.log("LOGIN NOT WORKING");
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error Occurred");
        }
        if (user) {
            console.log("LOGIN WORKING");
            // res.cookie('cookie', user.username, { maxAge: 900000, httpOnly: false, path: '/' });
            // req.session.user = user;


            //jwt
            const payload = {_id: user._id, username: user.username};
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
            res.end("Invalid Credentials");
            console.log("login failed");
        }
    });


});


//update profile
router.put("/update/:id", async (req, res) => {

    // await User.findByIdAndUpdate( req.params.id, { $set: req.body, }, { new: true },
    //     (err, result) =>
    //     {
    //         if (err) {
    //             console.log(err);
    //             console.log("ERROR UPDATING PROFILE");
    //             res.writeHead(400, {
    //                 'Content-Type': 'text/plain'
    //             })
    //             res.end("ERROR UPDATING PROFILE");
    //         } else {
    //             // res.send(result);
    //             console.log("profile update works");
    //
    //             res.status(200).json(result);
    //             res.end("Successful PROFILE UPDATE");
    //         }
    //
    //
    //     });
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
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


module.exports = router;
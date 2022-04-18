const express = require('express') //express module
const app = express(); // create an express app
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors'); //use cors to allow cross origin resource sharing
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const db = require("./Utils/config");
const path = require('path');
//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
// app.use(express.static(__dirname + '/public/images'));
app.use('/static', express.static(path.join(__dirname + 'images')));
const multer = require('multer');

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo', resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


const storage = multer.diskStorage({
    destination: './public/images', filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }

});
const upload = multer({
    storage: storage
})


//connect to mongoDB
// const { mongoDB } = require('./Utils/config'); //dotenv.config();
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();
const Users = require('./Models/UserModel');


const jwt = require('jsonwebtoken');
const { secret } = require('./Utils/config');
const { auth } = require("./Utils/passport");
auth();

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     poolSize: 500,
//     bufferMaxEntries: 0
// };

// mongoose.connect(mongoDB, options, (err, res) => {
//     if (err) {
//         console.log(err);
//         console.log(`MongoDB Connection Failed`);
//     } else {
//         console.log(`MongoDB Connected`);
//     }
// });

mongoose.connect(process.env.MONGO_URL ,(err, res) => { //mongoose.connect(mongoDB )
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});





app.post('/signup', async (req, res) => {
    console.log("Inside SiGN UP POST");

    const newUser = new Users({
        username: req.body.email,
        password: req.body.password,

    });

    console.log(req.body.email);
    console.log(req.body.password);

    Users.findOne({ username: req.body.email }, (error, userTaken) => {
        if (error) {
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
        }
        else {
            newUser.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
                else {
                    console.log("sign up works");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
            });
        }
    });


});


//login
app.post('/login', async (req, res) => {

    console.log("INSIDE LOGIN");
    const usernameValue = req.body.username;
    const passwordValue = req.body.password;
    console.log(usernameValue);
    console.log(passwordValue);

    Users.findOne({ username: req.body.username, password: req.body.password }, (error, user) => {
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
            const payload = { _id: user._id, username: user.username};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.status(200).end("JWT " + token);
        }
        else {
            res.writeHead(401, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials");
            console.log("login failed");
        }
    });


});


//route to root
app.get('/', function (req, res) {
    //check if user session exits
    if (req.session.user) {
        res.render('/home');
    } else res.render('/login');
});


app.get('/home', async function (req, res) {
    console.log("INSIDE HOME")
    // let session = req.session;
    // console.log(session);
    console.log(session);
    console.log(req.session);
    // console.log(session.username); //doesn't work, need req
    console.log(req.session.username)
    const userToken = req.session.user[0].username;

    await db.query("SELECT * FROM users WHERE username = ?", [userToken], function (err, result) {
        if (err) {
            console.log(err);
            console.log("not working");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
        } else {
            res.send(result);
            console.log("Home working");
        }

    });
});


// app.get('/upload', function (req,res) {
//     res.render("upload")
// });
// app.post('/upload', upload.single('image'), function (req,res) {
//
//
//     console.log(req.file.profilePic);
//     res.send("image uploaded");
// });
app.post('/sell', upload.single('image'), async function (req, res) {
    console.log("Inside add product page");
    const {productName, category, description, price, quantity} = req.body;
    const imgUrl = req.file.path;
    console.log(req.file)
    console.log(req.file.filename)
    console.log(req.file.path)

    const userToken = req.session.user[0].username;
    await db.query("INSERT INTO products (sellerName, itemName, itemPic, category, description, price, quantity) VALUES (?, ?,?,?,?,?,?)",
        [userToken, productName, imgUrl, category, description, price, quantity],

        function (err, result) {
            if (err) {
                console.log(err);
                console.log("ERROR ADDING PRODUCT");
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("ERROR ADDING PRODUCT");
            } else {
                console.log("add product works");
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Successful ADDING PRODUCT");
            }

        });

});


app.put('/updateSell', upload.single('image'), async function (req, res) {
    console.log("Inside Update product page");
    // const {productName, category, description, price, quantity} = req.body;
    // const imgUrl = req.file.path;
    // console.log(req.file)
    // console.log(req.file.filename)
    // console.log(req.file.path)
    const {productName, price} = req.body;


    await db.query("UPDATE products SET (price) WHERE productName = ? ", [productName, price],

        function (err, result) {
            if (err) {
                console.log(err);
                console.log("ERROR Update PRODUCT");
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("ERROR Update PRODUCT");
            } else {
                console.log("Update product works");
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Successful Update PRODUCT");
            }

        });

});

// app.get('/productList', async function (req, res) {
//      // res.render('/profile');
//
//      console.log("Inside Products ");
//      await db.query(
//          "SELECT * FROM products",
//          function (err, result) {
//              if (err) {
//                   console.log(err);
//                  console.log("GET Products ERROR")
//                  res.writeHead(400, {
//                      'Content-Type': 'text/plain'
//                  })
//              }
//              if (result.length > 0) {
//                  res.send(result);
//                  console.log("GET Products WORKING")
//              } else { //no username
//                  res.writeHead(400, {
//                      'Content-Type': 'text/plain'
//                  })
//                  res.status(400);
//                  console.log("GET Products NOT WORKING")
//              }
//          });
//  });


app.get('/profile', async function (req, res) {
    // res.render('/profile');

    console.log("Inside Profile ");
    const userToken = req.session.user[0].username;
    await db.query("SELECT * FROM users WHERE username = ?", [userToken], function (err, result) {
        if (err) {
            console.log(err);
            console.log("GET PROFILE ERROR")
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
        }
        if (result.length > 0) {
            res.send(result);
            console.log("GET PROFILE WORKING")
        } else { //no username
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.status(400);
            console.log("GET PROFILE NOT WORKING")
        }
    });
});


app.put('/profileupdate', upload.single('image'), async function (req, res) {
    console.log("Inside Profile update");
    const {name, street, city, state, country, zipcode, phoneNum, birthMonth, birthday, about} = req.body;
    const profilePic = req.file.path;
    console.log(req.file)
    // console.log(req.file.filename)
    // console.log(req.file.path)

    // if (!req.session.user) {
    //         res.redirect('/');
    // } else {
    const userToken = req.session.user[0].username;
    await db.query("UPDATE users SET name = ?, profilePic = ?, street = ?, city = ?, state = ?, country = ?, zipcode = ?, phonenumber = ?, birthmonth = ?, birthday = ?, about = ? WHERE username = ? ", [name, profilePic, street, city, state, country, zipcode, phoneNum, birthMonth, birthday, about, userToken], // db.query("UPDATE users SET name = ? WHERE username = ? ", [req.body.name, req.session.username],
        function (err, result) {
            if (err) {
                console.log(err);
                console.log("ERROR UPDATING PROFILE");
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Error while signing up");
            } else {
                // res.send(result);
                console.log("profile update works");
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Successful PROFILE UPDATE");
            }

        });
    // }


});


app.put('/sellerUpdate', upload.single('image'), async function (req, res) {
    console.log("Inside Seller Profile update");
    const shopPic = req.file.path;
    console.log(req.file)
    const userToken = req.session.user[0].username;
    await db.query("UPDATE users SET shoPic = ? WHERE username = ? ", [shopPic, userToken], // db.query("UPDATE users SET name = ? WHERE username = ? ", [req.body.name, req.session.username],
        function (err, result) {
            if (err) {
                console.log(err);
                console.log("ERROR UPDATING SHOP PROFILE");
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Error UPDATING SHOP PROFILE");
            } else {
                // res.send(result);
                console.log("profile update works");
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Successful SHOP PROFILE UPDATE");
            }

        });
    // }


});

app.get('/sellerProfile', async (req, res) => {
    // res.render('/profile');
    console.log("Inside seller Profile ");
    console.log(req.session.username);
    // console.log(req.session.seller)
    const userToken = req.session.user[0].username;
    await db.query("SELECT * FROM users WHERE username = ?", [userToken], function (err, result) {
        if (err) {
            console.log(err);
            console.log("GET seller PROFILE ERROR")
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
        }
        if (result.length > 0) {
            res.send(result);
            console.log("GET seller PROFILE WORKING")
        } else {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            console.log("GET seller PROFILE NOT WORKING")
        }
    });
});
app.post('/searchShop', async (req, res) => {
    const shopName = req.body.shopName;
    console.log(shopName);

    await db.query("SELECT shopName FROM users WHERE shopName = ?", [shopName], function (err, result) {
        if (err) {
            console.log(err);
            console.log("searchShop NOT WORKING")
        }
        if (result.length > 0) {
            // res.send(result);
            res.send("Exists");
            // res.sendStatus(200)
            console.log("searchShop WORKING")

        } else if (!result.length) { //no shop
            // res.sendStatus(404)
            console.log("NO SHOP")
            res.send("doesn't exist")

            // res.writeHead(400, {
            //     'Content-Type': 'text/plain'
            // })
        }
    });


});

// app.get('/hasShop', async (req, res) => {
//     const userToken = req.session.user[0].username;
//     await db.query(
//         "SELECT shopName FROM sellers WHERE username = ?", [userToken],
//         function (err, result) {
//             if (err) {
//                 console.log(err);
//             }
//             if (result.length > 0) {
//
//                 res.send("Exists");
//
//             } else if (!result.length) { //no shop
//                 // res.sendStatus(404)
//                 console.log("NO SHOP")
//                 res.send("doesn't exist")
//
//             }
//         });


// });

app.put('/newseller', async function (req, res) {
    console.log("Inside NEW SHOP page");
    const {shopName} = req.body;
    console.log(shopName);
    const userToken = req.session.user[0].username;
    // const userToken = req.session.user[0].username;
    await db.query("UPDATE users set shopName = ? where username = ?", [shopName, userToken], function (err, result) {
        if (err) {
            console.log(err);
            console.log("ERROR ADDING NEW SHOP");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("ERROR ADDING NEW SHOP");
        } else {
            console.log("NEW SHOP works");
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful ADDING NEW SHOP");
        }

    });

});


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
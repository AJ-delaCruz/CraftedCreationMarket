const express = require('express') //express module
const app = express(); // create an express app
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors'); //use cors to allow cross origin resource sharing
// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3002'], credentials: true }));
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', '*');

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
const { mongoDB } = require('./Utils/config'); //dotenv.config();
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();

// Reuse connection to db
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100, // max connections in the pool
    // maxPoolSize: 100, //default
};

mongoose.connect(process.env.MONGODB_URL, options)
    .then(() => {
        console.log('MongoDB Connected');
        // console.log(mongoose.connection);
    })
    .catch((err) => {
        console.log(err);
        console.log('MongoDB Connection Failed');
    });
// export mongoose instance for shared models
module.exports = mongoose;



const userRoute = require("./routes/user");
const shopRoute = require("./routes/shop");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");

app.use("/user", userRoute);
app.use("/shop", shopRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/carts", cartRoute);


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
const dotenv = require("dotenv")
dotenv.config();

//connect to mongoDB
const mongoose = require('mongoose');

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


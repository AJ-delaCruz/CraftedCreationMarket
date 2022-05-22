const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema
const usersSchema = new Schema({
        // email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        name:{ type: String, default: null},
        img:{ type: String, default: null},
        street: {type: String, default: null},
        state: {type: String, default: null},
        city: {type: String, default: null},
        country: {type: String, default: null},
        zipCode: {type: Number, default: null},
        email: {type: String, default: null},
        phoneNum: {type: Number, default: null},
        birthDay: {type: Date, default: null},
        shopName:{ type: String, default: null},
        shopImg:{ type: String, default: null},
        // products: [
        //     {
        //         productId: {
        //             type: String,
        //         }
        //     },
        // ],
    },

    {
        versionKey: false
    });


//model based on schema
const UserModel = mongoose.model('user', usersSchema);
module.exports = UserModel;
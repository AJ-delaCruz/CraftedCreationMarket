const nodemailer = require("nodemailer");
const Product = require('../Models/ProductModel');
const User = require('../Models/UserModel');

// send email notifications
// https://nodemailer.com/about/
const sendEmail = async (to, subject, text) => {
    // create transporter object using Gmail's SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "smtp.forwardemail.net",
        // port: 465,
        // secure: true,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // sender email 
            pass: process.env.EMAIL_PW // sender password
            //todo OAth2, more secure
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Etsy-clone" <${process.env.EMAIL}>`, // sender email
        to: to, // fetch customer email here 'customer-email@gmail.com',
        subject: subject, // Subject line
        text: text, // plain text body
    });

    console.log("Email sent: %s", info.messageId);
}

// handle notification for user after user order is confirmed
const notifyUser = async (order) => {
    const user = await User.findOne({ _id: order.userId });

    if (user) {
        const userEmail = user.email; // get buyer email
        const subject = 'Order Confirmation';
        const text = `Your order for ${order.title} has been confirmed.`;

        sendEmail(userEmail, subject, text);
    } else {
        console.log("Order could not be confirmed.");
    }
}


// handle notification for seller after user orders their product
const notifySeller = async (order) => {
    // console.log(order);
    const product = await Product.findOne({ _id: order.productId });
    const seller = await User.findOne({ _id: product.sellerId });

    if (seller) {
        const sellerEmail = seller.email; // get seller email
        const subject = "Product Sold Notification";
        const text = `Your product, ${product.title}, has been sold. Please check your shop for more details.`;

        sendEmail(sellerEmail, subject, text);
    } else {
        console.log("Seller not found for the given productId.");
    }
}

module.exports = { notifyUser, notifySeller };

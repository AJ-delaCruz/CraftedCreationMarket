const connection = new require('./kafka/Connection');
//topics files
// const Books = require('./services/books.js');
const Orders = require('./services/order.js');
const Favorites = require('./services/favorite.js');
const Products = require('./services/product.js');



//connect to mongoDB
const { mongoDB } = require('./Utils/config'); //dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(mongoDB ,(err, res) => { //mongoose.connect(process.env.MONGO_URL) for better security
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});




function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    const consumer = connection.getConsumer(topic_name);
    const producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        const data = JSON.parse(message.value);

        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            const payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books); //sample demo
handleTopicRequest("post_order",Orders);
handleTopicRequest("get_product",Products);
handleTopicRequest("post_favorite",Favorites);



const { Kafka } = require('kafkajs');
const { updateProductQuantity } = require('../services/product.js');
const { notifyUser, notifySeller } = require('../services/notification.js')

const host = process.env.KAFKA_HOST_IP || 'localhost';

const kafkaConsumer = async (consumerId) => {
  // Create a new Kafka client for each consumer 
  const kafka = new Kafka({
    clientId: `Etsy-app-${consumerId}`, // unique clientId for each consumer for identification purposes
    brokers: [`${host}:9092`],
  });

  // Create a new Kafka consumer for each function call
  const consumer = kafka.consumer({ groupId: 'order-group' });  //group of consumers

  // Connect the consumer to the Kafka broker
  await consumer.connect()
    .then(() => console.log(`Connected to Kafka Consumer ${consumerId}`));

  // Subscribe to topics
  await consumer.subscribe({ topic: 'orders', fromBeginning: true });

  // Set up the consumer to process each message from topics
  await consumer.run({

    // handles messages one at a time
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Consumer ${consumerId} processing message from partition ${partition}`);

      const value = JSON.parse(message.value.toString()); // convert JSON string to JS object
      try {
        switch (topic) {
          case 'orders': {
            // console.log('Order created:', value);
            const order = value;

            //handle updates for the product quantity and sales
            await updateProductQuantity(order);
            // send user email order confirmation
            await notifyUser(order);
            // send seller email notification
            await notifySeller(order);

            break;
          }
          default:
            console.log('Unknown topic:', topic);
        }
      } catch (err) {
        console.error(`Error processing message from topic '${topic}':`, err);
      }
    },
  });

  //Disconnect consumers when the application shuts down
  process.once('SIGINT', async () => {
    await consumer.disconnect();
    console.log(`Consumer ${consumerId} disconnected.`);
    process.exit(0);
  });
};






module.exports = { kafkaConsumer };

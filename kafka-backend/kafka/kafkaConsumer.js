const { consumer } = require('./kafkaClient.js');
const { updateProductQuantity } = require('../services/product.js');

const kafkaConsumer = async () => {
  // Connect the consumer to the Kafka broker
  await consumer.connect();

  // Subscribe to topics
  await consumer.subscribe({ topic: 'orders', fromBeginning: true });

  // Set up the consumer to process each message from topics
  // Perform kafka services API publish topics
  await consumer.run({
    // handles messages one at a time
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString()); // convert JSON string to JS object
      try {
        switch (topic) {
          case 'orders': {
            console.log('Order created:', value);
            const order = value;

            //handle updates for the product quantity and sales
            await updateProductQuantity(order);

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
};

module.exports = { kafkaConsumer };

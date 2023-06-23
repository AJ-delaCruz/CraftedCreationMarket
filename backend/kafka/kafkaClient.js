const { Kafka } = require('kafkajs')

const host = process.env.KAFKA_HOST_IP || 'localhost';

// Create the client with the broker for producer
const kafka = new Kafka({
    clientId: 'Etsy-app', // app identifier to the Kafka brokers
    brokers: ['localhost:9092'],
});



// manage Kafka producer on main app
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'order-group' }); //group of consumers

module.exports = { producer, consumer, kafka };

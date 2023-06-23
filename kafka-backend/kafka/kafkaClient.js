const { Kafka } = require('kafkajs')

const host = process.env.KAFKA_HOST_IP || 'localhost';

// Create the client with the broker for consumer side
const kafka = new Kafka({
    clientId: 'Etsy-app', // app identifier to the Kafka brokers
    brokers: [`${host}:9092`],
});

// manage Kafka consumer on kafka backend
const consumer = kafka.consumer({ groupId: 'order-group' }); //group of consumers

module.exports = { consumer, kafka };

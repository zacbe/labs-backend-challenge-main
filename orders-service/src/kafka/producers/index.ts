import { Kafka, logLevel, Producer } from 'kafkajs';

import config from '../../utils/kafkaConfig';

const kafka = new Kafka({
  clientId: config.clientId,
  brokers: [config.bootStrapServers],
  logLevel: logLevel.INFO,
});

const producer: Producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
  } catch (error) {
    console.error('Failed to connect to Kafka producer:', error);
  }
};

const sendMessage = async (topic: string, message: string): Promise<void> => {
  try {
    await producer.send({
      topic,
      messages: [{ value: message }],
    });

    console.info(`Message sent to topic "${topic}": ${message}`);
  } catch (error) {
    console.error(`Failed to send message to topic "${topic}":`, error);
  }
};
export { connectProducer, sendMessage };

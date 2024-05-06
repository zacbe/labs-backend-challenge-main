import { EachMessagePayload, Kafka } from 'kafkajs';

import config from '../../utils/kafkaConfig';

const consumer = createKafkaConsumer(config.clientId, [config.bootStrapServers], config.groupId);
const topics = [config.topicPersonChanged, config.topicPersonCreated, config.topicPersonDeleted];

function createKafkaConsumer(clientId: string, brokers: string[], groupId: string) {
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId });

  return consumer;
}

async function startKafkaConsumer(
  consumer: ReturnType<typeof createKafkaConsumer>,
  topics: string[],
  messageHandlers: { [key: string]: (key: Buffer | null, value: Buffer | null) => void }
): Promise<void> {
  await consumer.connect();
  await consumer.subscribe({ topics, fromBeginning: false });

  await consumer.run({
    eachMessage: async (messagePayload: EachMessagePayload) => {
      const { topic, partition, message } = messagePayload;
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      const handler = messageHandlers[topic];
      if (handler) {
        handler(message.key, message.value);
      } else {
        console.warn(`No handler found for topic: ${topic}`);
      }
    },
  });
}

export { consumer, createKafkaConsumer, startKafkaConsumer, topics };

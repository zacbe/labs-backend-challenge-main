import { env } from './envConfig';

const kafkaConfig = {
  clientId: env.KAFKA_CLIENT_ID,
  groupId: env.KAFKA_GROUP_ID,
  brokers: env.KAFKA_BROKER,
  bootStrapServers: env.KAFKA_BOOTSTRAP_SERVER,

  topicOrderChanged: env.KAFKA_TOPIC_ORDER_CHANGED,
  topicOrderCreated: env.KAFKA_TOPIC_ORDER_CREATED,
  topicOrderDeleted: env.KAFKA_TOPIC_ORDER_DELETED,
  topicPersonChanged: env.KAFKA_TOPIC_PERSON_CHANGED,
  topicPersonCreated: env.KAFKA_TOPIC_PERSON_CREATED,
  topicPersonDeleted: env.KAFKA_TOPIC_PERSON_DELETED,
};

export default kafkaConfig;

import dotenv from 'dotenv';
import { cleanEnv, host, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  // General
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(8081) }),
  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:8081') }),
  EVENT_SOURCE_SERVICE_HOST: str({ devDefault: testOnly('http://localhost:8081/v1/api/orders') }),

  // Contact Service
  CONTACTS_SERVICE_HOST: str({ desc: 'Contact service host' }),

  // Kafka configuration
  KAFKA_CLIENT_ID: str({ desc: 'Kafka client ID' }),
  KAFKA_GROUP_ID: str({ desc: 'Kafka group ID' }),
  KAFKA_BROKER: str({ desc: 'Comma-separated list of Kafka brokers' }),
  KAFKA_BOOTSTRAP_SERVER: str({ desc: 'Kafka bootstrap servers' }),

  // Kafka topics
  KAFKA_TOPIC_ORDER_CHANGED: str({ desc: 'Topic for order changed events' }),
  KAFKA_TOPIC_ORDER_CREATED: str({ desc: 'Topic for order created events' }),
  KAFKA_TOPIC_ORDER_DELETED: str({ desc: 'Topic for order deleted events' }),
  KAFKA_TOPIC_PERSON_CHANGED: str({ desc: 'Topic for person changed events' }),
  KAFKA_TOPIC_PERSON_CREATED: str({ desc: 'Topic for person created events' }),
  KAFKA_TOPIC_PERSON_DELETED: str({ desc: 'Topic for person deleted events' }),
});

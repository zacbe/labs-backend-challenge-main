import dotenv from 'dotenv';
import { cleanEnv, host, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(8081) }),
  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:8081') }),
  CONTACTS_SERVICE_HOST: str({ devDefault: testOnly('http://localhost:8080') }),
  EVENT_SOURCE: str({ devDefault: testOnly('http://localhost:8081/v1/api/orders') }),
});

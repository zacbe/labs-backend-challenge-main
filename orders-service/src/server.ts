import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../docs/swagger-output.json';
import { orderRouter } from './api/v1/routes';
import { consumer, startKafkaConsumer, topics } from './kafka/consumers';
import { EventHandlersMap } from './kafka/event-handlers';
import { connectProducer } from './kafka/producers';
import { errorHandler } from './middleware';
import { sequelize } from './models';
import { env } from './utils/envConfig';

(async () => {
  // initialize the squelize connection
  await sequelize.sync({ alter: true, force: false });

  // Start Kafka consumer
  await startKafkaConsumer(consumer, topics, EventHandlersMap);
  console.log('Kafka consumer started');

  // Connect the Kafka producer once
  await connectProducer();
  console.log('Kafka producer started');
})();

const corsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true,
};

const app: Express = express();

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Sequelize
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

// Routes
app.use('/api/v1', orderRouter);
app.get('/', (_req: Request, res: Response) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Documentation</title>
      </head>
      <body>
        <h1>Orders API</h1>
        <p>Check the <a href="http://localhost:${env.PORT}/api-docs/">API documentation</a>.</p>
      </body>
      </html>
    `);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);

export { app };

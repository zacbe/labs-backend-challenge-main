import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../docs/swagger-output.json';
import { orderRouter } from './api/v1/routes';
import { errorHandler } from './middleware';
import { sequelize } from './models';
import { env } from './utils/envConfig';

const corsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true,
};
// initialize the squelize connection
(async () => {
  await sequelize.sync({ alter: true, force: false });
})();

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

export default app;

import swaggerAutogen from 'swagger-autogen';

import { env } from './envConfig';

const swaggerAutoGen = swaggerAutogen({
  openapi: '3.0.0',
  autoHeaders: true,
});

console.log('Generating Swagger documentation...');

const host = `${env.HOST}:${env.PORT}`;
const doc = {
  info: {
    title: 'Labs Challenge API',
    description: 'Labs Challenge API Documentation',
  },
  host,
  schemes: ['http'],
};

const outputFile = '../../docs/swagger-output.json';
const endpointsFiles = ['../../dist/index.js', '../../dist/server.js', '../../dist/api/v1/routes/orderRouter.js'];

swaggerAutoGen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully.');
  })
  .catch((error) => {
    console.error('Failed to generate Swagger documentation:', error);
  });

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { env } from './config/env.js';

export const createApp = () => {
  const app = express();

  /*
   * Avoid exposing unnecessary framework information
   * through the X-Powered-By response header.
   */
  app.disable('x-powered-by');

  /*
   * Adds commonly recommended HTTP security headers.
   */
  app.use(helmet());

  /*
   * During development, requests are accepted only
   * from the configured ChainLance frontend origin.
   */
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  /*
   * Structured HTTP request logging.
   */
  app.use(pinoHttp());

  /*
   * Parse JSON while preventing unexpectedly large
   * request bodies during the MVP.
   */
  app.use(
    express.json({
      limit: '100kb',
    }),
  );

  /*
   * API health endpoint.
   *
   * This does not check PostgreSQL or Ethereum yet.
   * Those checks will be introduced when those
   * dependencies exist.
   */
  app.get('/api/v1/health', (_request, response) => {
    response.status(200).json({
      status: 'ok',
      service: 'chainlance-api',
      environment: env.NODE_ENV,
    });
  });

  /*
   * Catch unknown routes and return a consistent
   * JSON response instead of HTML.
   */
  app.use((_request, response) => {
    response.status(404).json({
      error: {
        code: 'ROUTE_NOT_FOUND',
        message: 'The requested resource was not found.',
      },
    });
  });

  return app;
};

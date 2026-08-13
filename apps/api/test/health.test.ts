import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';

describe('ChainLance API', () => {
  describe('GET /api/v1/health', () => {
    it('returns the API health status', async () => {
      const app = createApp();

      const response = await request(app)
        .get('/api/v1/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        service: 'chainlance-api',
        environment: 'test',
      });
    });
  });

  describe('unknown routes', () => {
    it('returns a structured JSON 404 response', async () => {
      const app = createApp();

      const response = await request(app)
        .get('/api/v1/not-found')
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: 'ROUTE_NOT_FOUND',
          message: 'The requested resource was not found.',
        },
      });
    });
  });
});
import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(
    `ChainLance API running on http://localhost:${env.PORT}`,
  );
});

const shutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down API.`);

  server.close((error) => {
    if (error) {
      console.error(
        'Failed to close HTTP server cleanly.',
        error,
      );

      process.exit(1);
    }

    process.exit(0);
  });
};

process.once('SIGTERM', () => {
  shutdown('SIGTERM');
});

process.once('SIGINT', () => {
  shutdown('SIGINT');
});
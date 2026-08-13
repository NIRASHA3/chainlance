import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().int().min(1).max(65535).default(4000),

  CORS_ORIGIN: z.url().default('http://localhost:5173'),

  DATABASE_URL: z.string().min(1).optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const formattedError = z.flattenError(result.error);

  console.error('Invalid environment configuration:');
  console.error(formattedError.fieldErrors);

  process.exit(1);
}

export const env = result.data;

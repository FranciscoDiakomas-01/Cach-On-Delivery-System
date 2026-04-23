import { z } from 'zod';

export const envSchema = z.object({
  APP_NAME: z.string().nonempty(),
  SMTP_HOST: z.string().nonempty(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.email(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  RECOVERY_EXPIRES: z.coerce.number().default(10),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  PORT: z.coerce.number().nonnegative().min(3030),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_REDIRECT_URI: z.url(),
  JWT_SECRET: z.string().nonempty(),
  RESET_LINK: z.url().nonempty(),
  DEFAULT_EMAIL: z.email().nonempty(),
  DEFAULT_PASSWORD: z.string().nonempty(),
});

export type Env = z.infer<typeof envSchema>;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import client from 'prom-client';
import type { Request, Response } from 'express';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ---------------- PROMETHEUS ----------------
  const register = new client.Registry();
  client.collectDefaultMetrics({ register });

  const httpRequests = new client.Counter({
    name: 'ecommerce_http_requests_total',
    help: 'Total de requests',
    labelNames: ['method', 'route', 'status'],
    registers: [register],
  });

  const httpDuration = new client.Histogram({
    name: 'ecommerce_http_duration_seconds',
    help: 'Tempo das requests',
    labelNames: ['method', 'route', 'status'],
    registers: [register],
  });

  const ordersCreated = new client.Counter({
    name: 'ecommerce_orders_created_total',
    help: 'Pedidos criados',
    registers: [register],
  });

  // ---------------- METRICS ROUTE ----------------
  const server = app.getHttpAdapter().getInstance();

  server.get('/metrics', async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  // ---------------- SWAGGER ----------------
  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      content: document,
      theme: 'deepSpace',
    }),
  );

  // ---------------- METRICS MIDDLEWARE (FIXED) ----------------
  app.use((req: Request, res: Response, next: () => void) => {
    const end = httpDuration.startTimer();

    res.on('finish', () => {
      const route = req.path; // evita query strings explosivas

      httpRequests.inc({
        method: req.method,
        route,
        status: res.statusCode,
      });

      end({
        method: req.method,
        route,
        status: res.statusCode,
      });
    });

    next();
  });

  // ---------------- GLOBAL MIDDLEWARES ----------------
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(compression());

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    console.log('Server is running');
  })
  .catch((e) => {
    console.error(e);
    throw new Error(String(e));
  });

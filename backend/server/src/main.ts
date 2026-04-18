/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import client from 'prom-client';
import type { Request, Response } from 'express';
import { HttpServer } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  const server = app.getHttpAdapter().getInstance() as HttpServer;

  server.get('/metrics', async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

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
  app.use((req: Request, res: Response, next: () => void) => {
    const end = httpDuration.startTimer();
    res.on('finish', () => {
      httpRequests.inc({
        method: req.method,
        route: req.url,
        status: res.statusCode,
      });

      end({
        method: req.method,
        route: req.url,
        status: res.statusCode,
      });
    });
    next();
  });
  app.enableCors();
  app.enableShutdownHooks();
  const port = process.env.PORT ?? 3000;
  console.log(port);
  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log('Server is runnig');
  })
  .catch((e: string) => {
    throw new Error(e);
  });

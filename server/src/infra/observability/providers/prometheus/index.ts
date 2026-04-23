import client from 'prom-client';

export default class Prometheus {
  public excute() {
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

    return {
      register,
      httpDuration,
      httpRequests,
      ordersCreated,
    };
  }
}

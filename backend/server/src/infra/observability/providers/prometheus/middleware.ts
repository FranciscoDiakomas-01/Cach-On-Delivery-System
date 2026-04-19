import type { Request, Response } from 'express';
import Prometheus from '.';

export default function IncMetricsMiddleware(
  req: Request,
  res: Response,
  next: (error?: any) => void,
) {
  const prometheus = new Prometheus();
  const { httpDuration, httpRequests } = prometheus.excute();
  const end = httpDuration.startTimer();
  res.on('finish', () => {
    const route = req.path;
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
}

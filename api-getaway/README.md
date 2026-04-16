# 🧠 Backend Documentation

## 📌 Visão Geral

O **Recommendation Service** é um microserviço responsável por gerar recomendações personalizadas de produtos com base em:

- comportamento do usuário
- eventos do sistema
- popularidade de produtos
- similaridade entre produtos

Ele é **event-driven**, desacoplado e otimizado para leitura rápida.

---

# 🧱 1. Stack Tecnológica

## Backend

- Node.js
- TypeScript
- NestJS (arquitetura modular)
- Prisma (ORM)

---

## Banco de dados

- PostgreSQL (principal)
- Redis (cache + ranking rápido)

---

## Mensageria

- RabbitMQ ou Kafka
  - RabbitMQ → simples e suficiente para início
  - Kafka → escala grande (futuro)

---

## Infraestrutura

- Docker
- Docker Compose
- (opcional) Kubernetes

---

# 📁 2. Estrutura de Pastas (NestJS)

```bash
recommendation-service/
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── rabbitmq.config.ts
│   │   └── env.config.ts
│
│   ├── shared/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── types/
│   │   └── decorators/
│
│   ├── modules/
│   │
│   │   ├── events/
│   │   │   ├── events.module.ts
│   │   │   ├── events.consumer.ts
│   │   │   ├── events.service.ts
│   │   │   └── handlers/
│   │   │       ├── product-viewed.handler.ts
│   │   │       ├── product-clicked.handler.ts
│   │   │       ├── order-created.handler.ts
│   │   │       └── search-performed.handler.ts
│   │
│   │   ├── recommendations/
│   │   │   ├── recommendations.module.ts
│   │   │   ├── recommendations.controller.ts
│   │   │   ├── recommendations.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── base.strategy.ts
│   │   │   │   ├── popular-products.strategy.ts
│   │   │   │   ├── collaborative-filtering.strategy.ts
│   │   │   │   ├── category-based.strategy.ts
│   │   │   │   └── similarity.strategy.ts
│   │   │   └── dto/
│   │   │
│   │   ├── users-profile/
│   │   │   ├── users-profile.module.ts
│   │   │   ├── users-profile.service.ts
│   │   │   └── users-profile.repository.ts
│   │
│   │   ├── products/
│   │   │   ├── products.module.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.repository.ts
│   │
│   │   ├── analytics/
│   │   │   ├── analytics.module.ts
│   │   │   ├── analytics.service.ts
│   │   │   └── analytics.repository.ts
│   │
│   │   ├── cache/
│   │   │   ├── cache.module.ts
│   │   │   ├── cache.service.ts
│   │   │   └── redis.client.ts
│   │
│   │   └── health/
│   │       ├── health.controller.ts
│   │       └── health.module.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│
├── test/
│   ├── unit/
│   ├── integration/
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
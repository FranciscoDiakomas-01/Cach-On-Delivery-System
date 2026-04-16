# 🛒 E-commerce Moderno (Event-Driven + Delivery + COD) — Arquitetura Remodelada

## 0. Nota de arquitetura (importante)

- Pagamentos exigem consistência forte
- Entrega é um processo físico e assíncrono
- Notificações são eventual consistency
- Inventário é crítico (evitar overselling)
- Event-driven não substitui transações

---

# 1. Requisitos Funcionais

## 1.1 Usuários e Autenticação

- Registro com email e senha
- Login/logout seguro (JWT ou OAuth2)
- Recuperação de senha
- Papéis:
  - Cliente
  - Vendedor( Default ADMIN)
  - Entregador (novo)
- Perfil:
  - nome
  - telefone
  - foto (opcional)
- Histórico de ações (audit log)

---

## 1.2 Endereços (módulo separado)

Cada usuário pode ter múltiplos endereços:

- Nome:
  - Casa
  - Trabalho
  - Outro (custom)
- Campos:
  - país
  - cidade
  - bairro
  - rua / número
  - referência (opcional)
  - GPS (opcional)
- Funcionalidades:
  - definir endereço padrão
  - selecionar no checkout
  - usar localização atual

---

## 1.3 Catálogo de Produtos

- CRUD de produtos (admin/vendedor)
- Campos:
  - nome
  - descrição
  - preço
  - imagens
  - categoria
  - SKU
  - estoque
- Variações:
  - cor
  - tamanho
  - atributos customizáveis
- Busca:
  - categoria
  - preço
  - disponibilidade
  - popularidade
- Cache obrigatório (Redis)

---

## 1.4 Carrinho

- Carrinho persistente por usuário
- Carrinho guest
- Recalcular preços automaticamente
- Validação de estoque no checkout
- Expiração (ex: 7 dias)

---

## 1.5 Checkout

- Criar pedido a partir do carrinho
- Validar estoque antes de criar pedido
- Criar “Order Draft” antes da confirmação

---

## 1.6 Pagamento + Cash on Delivery (COD)

### Métodos:

- COD (principal)
- Pagamento online (futuro)

### Fluxos:

#### COD
- Pedido: `PENDING_CONFIRMATION`
- Entrega acontece
- Pagamento feito ao entregador
- Entregador confirma recebimento

#### Online
- `PENDING_PAYMENT`
- `PAID`
- fluxo normal

---

## 1.7 Pedidos

### Status:

- PENDING_CONFIRMATION
- PENDING_PAYMENT
- PAID
- PROCESSING
- READY_FOR_DELIVERY
- OUT_FOR_DELIVERY
- DELIVERED
- CANCELLED
- RETURNED

---

## 1.8 Delivery Service (núcleo do sistema)

### Entidades:

- Delivery Order
- Entregador (Rider)
- Rota / Atribuição

### Fluxo:

1. Pedido aprovado
2. Criação de Delivery Task
3. Atribuição de entregador:
   - automática ou manual
4. Entregador aceita
5. Status:
   - ASSIGNED
   - PICKED_UP
   - ON_THE_WAY
   - DELIVERED

---

## 1.9 Confirmação de entrega (crítico)

### Opções:

#### OTP
- Sistema gera código (6 dígitos)
- Cliente recebe código
- Entregador valida código

#### QR Code
- QR único por pedido
- Entregador escaneia
- Backend valida

👉 Recomendação: OTP como base + QR como UX opcional

---

## 1.10 Notificações

### Canais:
- Email
- SMS (opcional)
- Push notification

### Eventos:

- UserCreated
- OrderCreated
- PaymentSucceeded
- PaymentFailed
- DeliveryAssigned
- OutForDelivery
- DeliveryCompleted
- CODPaymentCollected

---

## 1.11 Administração

- Gestão de usuários
- Gestão de produtos
- Gestão de pedidos
- Gestão de entregadores

### Dashboard:

- vendas totais
- pedidos por status
- performance de entregadores
- taxa de entrega

---

# 2. Event-Driven Core

## Eventos principais:

- UserCreated
- ProductCreated
- CartUpdated
- OrderCreated
- OrderConfirmed
- PaymentInitiated
- PaymentSucceeded
- PaymentFailed
- DeliveryAssigned
- DeliveryPickedUp
- DeliveryCompleted
- CODPaymentCollected

---

## Regras:

- Pagamentos são críticos (não podem falhar)
- Entrega pode ser reprocessada
- Notificações são eventual consistency
- Eventos devem ser idempotentes

---

# 3. Requisitos Não Funcionais

## 3.1 Consistência

- Forte:
  - pagamentos
  - pedidos
  - entrega final
- Eventual:
  - notificações
  - tracking
  - analytics

---

## 3.2 Performance

- Checkout < 300ms
- Cache com Redis obrigatório
- Filas para processamento assíncrono

---

## 3.3 Resiliência

- retry com backoff exponencial
- dead-letter queue
- idempotência obrigatória
- reprocessamento de eventos de entrega

---

## 3.4 Segurança

- JWT + refresh token
- proteção contra:
  - SQL Injection
  - XSS
  - CSRF
- rate limiting em login e checkout
- logs de auditoria:
  - pagamentos
  - entregas
  - cancelamentos

---

## 3.5 Escalabilidade

- arquitetura stateless
- processamento assíncrono
- múltiplos consumidores de eventos
- serviços independentes quando necessário

---

## 3.6 Observabilidade

- logging centralizado
- métricas (Prometheus + Grafana)
- tracing distribuído (OpenTelemetry)
- monitoramento de filas

---

# 4. Pontos críticos (importante pensar)

- logística é um sistema separado, não um detalhe
- COD introduz risco de fraude
- estado de pedidos pode ficar inconsistente sem idempotência
- eventos não substituem transações
- inventário precisa de controle forte

---
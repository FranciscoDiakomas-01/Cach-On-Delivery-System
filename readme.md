# 🛒 E-commerce (Event-Driven + Delivery + COD)

## 📌 Apresentação Técnica do Sistema

---

# 1. Visão Geral

O sistema é uma plataforma de e-commerce moderna baseada em arquitetura **event-driven**, com suporte completo a:

- Compra de produtos online
- Pagamento **Cash on Delivery (COD)**
- Sistema de entrega com entregadores (delivery riders)
- Confirmação de entrega via OTP ou QR Code
- Gestão completa de pedidos em tempo real

---

# 2. Problema que o sistema resolve

E-commerce tradicional falha em:

- Escalar sob alta carga
- Gerir entregas de forma confiável
- Garantir consistência entre pagamento, estoque e pedido
- Lidar com COD de forma segura
- Separar corretamente responsabilidades do sistema

---

# 3. Solução proposta

A solução utiliza:

- Arquitetura **Event-Driven**
- Serviços desacoplados
- Processamento assíncrono
- Sistema de entrega independente
- Consistência forte onde necessário e eventual onde possível

---

# 4. Arquitetura do Sistema

## 4.1 Componentes principais

- Auth Service (usuários e autenticação)
- Product Service (catálogo)
- Cart Service (carrinho)
- Order Service (pedidos)
- Payment Service (pagamentos e COD)
- Delivery Service (logística e entregadores)
- Notification Service (emails, SMS, push)

---

## 4.2 Comunicação

- Eventos via broker (RabbitMQ / Kafka)
- Comunicação assíncrona entre serviços
- APIs REST/GraphQL para interação direta

---

# 5. Fluxo principal do sistema

## 5.1 Fluxo de compra (COD)

1. Cliente adiciona produtos ao carrinho
2. Cria pedido (`PENDING_CONFIRMATION`)
3. Sistema cria delivery task
4. Entregador é atribuído
5. Entrega é realizada
6. Cliente paga ao entregador
7. Sistema confirma pagamento (`CODPaymentCollected`)
8. Pedido finalizado como `DELIVERED`

---

## 5.2 Fluxo de compra (online)

1. Cliente cria pedido
2. Pedido fica `PENDING_PAYMENT`
3. Pagamento processado
4. Pedido muda para `PAID`
5. Delivery é iniciado
6. Entregador entrega
7. Cliente confirma via OTP ou QR
8. Pedido finalizado

---

# 6. Sistema de Entrega (Delivery Core)

## 6.1 Entregadores

- Cadastro de entregadores
- Atribuição automática ou manual
- Status em tempo real

## 6.2 Status de entrega

- ASSIGNED
- PICKED_UP
- ON_THE_WAY
- DELIVERED

## 6.3 Confirmação de entrega

- OTP Code (principal)
- QR Code (alternativo)
- Validação no backend

---

# 7. Sistema de Eventos

## Eventos principais

- UserCreated
- ProductCreated
- OrderCreated
- PaymentSucceeded
- PaymentFailed
- DeliveryAssigned
- DeliveryCompleted
- CODPaymentCollected

---

## Regras

- Eventos são assíncronos
- Devem ser idempotentes
- Retry automático em falhas
- Dead-letter queue para erros críticos

---

# 8. Endereços do usuário

Cada usuário pode ter múltiplos endereços:

- Casa
- Trabalho
- Outros

Campos:

- país
- cidade
- bairro
- rua
- número
- referência
- localização GPS (opcional)

---

# 9. Segurança

- JWT + Refresh Token
- Hash de senha (bcrypt/argon2)
- Proteção contra ataques comuns:
  - SQL Injection
  - XSS
  - CSRF
- Rate limiting em endpoints críticos
- Auditoria de ações sensíveis

---

# 10. Escalabilidade

- Serviços stateless
- Processamento assíncrono
- Cache com Redis
- Suporte a múltiplos consumidores
- Separação de domínios críticos (pagamento e entrega)

---

# 11. Resiliência

- Retry com backoff exponencial
- Circuit breaker
- Dead-letter queues
- Reprocessamento de eventos
- Idempotência obrigatória

---

# 12. Benefícios da arquitetura

- Alta escalabilidade
- Baixo acoplamento entre serviços
- Flexibilidade para crescimento
- Suporte a falhas sem colapsar o sistema
- Base sólida para sistemas reais de grande escala

---


# Canto

### A Distributed Chat Engineering Lab

Canto is a real-time distributed chat system built to explore backend engineering, asynchronous messaging, reliability, observability, and cloud deployment.

## Live Demo

**Canto:** https://imk-canto.netlify.app

## Overview

Canto separates message ingestion, asynchronous processing, persistence, and delivery instead of directly writing messages from a WebSocket handler to a database.

```text
Browser
   │
   │ WebSocket / STOMP
   ▼
Spring Boot
   │
   │ Kafka
   ▼
Kafka
   │
   ▼
Message Consumer
   │
   ├──────────────► Cassandra
   │
   ▼
WebSocket Broadcast
   │
   ▼
Connected Clients
```

PostgreSQL stores relational application data such as users, conversations, and participants, while Cassandra stores chat messages.

## Architecture

```text
                    ┌──────────────────┐
                    │   React + TS UI  │
                    └────────┬─────────┘
                             │
                       HTTPS / WSS
                             │
                             ▼
                    ┌──────────────────┐
                    │   Spring Boot    │
                    │    Chat Server   │
                    └───────┬──────────┘
                            │
                            │ Kafka
                            ▼
                    ┌──────────────────┐
                    │      Kafka       │
                    │  chat.messages   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Kafka Consumer   │
                    └───────┬──────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │    Cassandra     │
                    │     Messages     │
                    └──────────────────┘

                    ┌──────────────────┐
                    │   PostgreSQL     │
                    │ Users / Chats /  │
                    │   Participants   │
                    └──────────────────┘
```

## Message Flow

1. The client sends a STOMP message over WebSocket.
2. Spring Boot receives the message.
3. A `ChatMessageEvent` is created.
4. The event is published to Kafka.
5. The Kafka consumer processes the event asynchronously.
6. The message is persisted in Cassandra.
7. The processed event is broadcast to subscribed clients.
8. Metrics and distributed tracing record the processing path.

### Destinations

```text
/app/conversations/{conversationId}/messages
/topic/conversations/{conversationId}
chat.messages
```

## Data Storage

### PostgreSQL

PostgreSQL stores:

- Users
- Conversations
- Conversation participants

Flyway manages database migrations.

### Cassandra

Cassandra stores chat messages using:

```text
PRIMARY KEY (
    conversation_id,
    created_at,
    message_id
)
```

Messages are partitioned by conversation and ordered by creation time.

## Reliability

Canto uses Resilience4j to protect Cassandra persistence with a circuit breaker.

Current configuration includes:

- Count-based sliding window
- Window size of 5 calls
- Minimum 5 calls before evaluating failures
- 50% failure-rate threshold
- 10-second open-state wait duration
- 1 permitted call in half-open state
- Automatic transition from open to half-open

The persistence layer is protected with:

```java
@CircuitBreaker(name = "cassandra", fallbackMethod = "persistFallback")
```

## Observability

Canto uses:

- Spring Boot Actuator
- Micrometer
- OpenTelemetry
- Jaeger

### Metrics

```text
canto.messages.processed
canto.messages.failed
canto.message.processing.time
```

The UI exposes:

- Messages processed
- Messages failed
- Average processing time
- Circuit breaker state
- System health
- Cassandra health

### Distributed Tracing

A message can be traced across the processing pipeline:

```text
canto.chat.send
      │
      ▼
chat.messages send
      │
      ▼
chat.messages process
      │
      ▼
canto.chat.process
      │
      ▼
canto.cassandra.persist
```

## Technology Stack

| Area                    | Technology                              |
| ----------------------- | --------------------------------------- |
| Frontend                | React + TypeScript                      |
| Backend                 | Java 21                                 |
| Framework               | Spring Boot                             |
| Real-time communication | WebSocket / STOMP                       |
| Messaging               | Apache Kafka                            |
| Relational database     | PostgreSQL                              |
| Distributed database    | Cassandra                               |
| Persistence             | Spring Data JPA / Spring Data Cassandra |
| Database migrations     | Flyway                                  |
| Reliability             | Resilience4j                            |
| Metrics                 | Micrometer                              |
| Tracing                 | OpenTelemetry                           |
| Trace visualization     | Jaeger                                  |
| Containerization        | Docker                                  |
| Backend deployment      | AWS EC2                                 |
| Frontend deployment     | Netlify                                 |

## Project Structure

```text
ChatServer/
│
├── api/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │           ├── db/
│   │           │   └── migration/
│   │           ├── application.yaml
│   │           ├── application-dev.yaml
│   │           └── application-prod.yaml
│   ├── Dockerfile
│   └── pom.xml
│
├── ui/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── infrastructure/
    ├── docker-compose.yml
    └── cassandra/
        └── init.cql
```

## Running Locally

### Prerequisites

- Java 21
- Maven
- Node.js
- Docker
- Docker Compose

### Start Canto

From the `infrastructure` directory:

```bash
docker compose up -d
```

This starts:

- PostgreSQL
- Cassandra
- Kafka
- Spring Boot

### Start the Frontend

From the `ui` directory:

```bash
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The backend runs at:

```text
http://localhost:8080
```

## Health Check

Spring Boot Actuator exposes:

```text
/actuator/health
```

For local development:

```bash
curl http://localhost:8080/actuator/health
```

## Deployment

Canto is deployed with:

```text
Frontend  → Netlify
Backend   → AWS EC2
Services  → Docker Compose
HTTPS/WSS  → Cloudflare Quick Tunnel
```

The backend services communicate internally through the Docker network.

## Engineering Focus

Canto focuses on:

- Real-time communication
- Event-driven architecture
- Asynchronous processing
- Kafka-based messaging
- Polyglot persistence
- Cassandra data modeling
- Circuit breakers
- Application metrics
- Distributed tracing
- Containerized infrastructure
- Cloud deployment

The goal is not simply to build a chat application, but to understand the engineering behavior and trade-offs of a distributed message-processing system.

## Future Work

Planned experiments include:

- Controlled failure injection
- Latency injection
- Chaos engineering
- Kafka failure scenarios
- Cassandra failure scenarios
- Performance testing
- Recovery behavior
- Scaling experiments

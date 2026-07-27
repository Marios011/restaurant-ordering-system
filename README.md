# Restaurant Ordering System - Microservices Architecture

A comprehensive microservices-based restaurant ordering system built with Spring Boot, featuring service-to-service communication via RabbitMQ and centralized API Gateway routing.

## System Architecture



## Services

### 1. Order Service (Port 8083)
- Manages restaurant orders
- Database: H2 (in-memory)
- Endpoints: `/api/orders/**`

### 2. Menu Service (Port 8080)
- Manages restaurant menu and products
- Database: MySQL
- Endpoints: `/api/products/**`

### 3. Table Service (Port 8081)
- Manages restaurant tables and availability
- Database: MySQL
- Endpoints: `/api/tables/**`

### 4. API Gateway (Port 9000)
- Single entry point for all requests
- Routes to appropriate services
- Framework: Spring Cloud Gateway

## Technologies

- **Framework**: Spring Boot 3.x & 4.x
- **Language**: Java 17
- **Build Tool**: Maven
- **Message Broker**: RabbitMQ 3.12
- **Database**: MySQL 8.0 & H2
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker Desktop installed
- Docker Compose (included with Docker Desktop)
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Marios011/restaurant-ordering-system.git
cd restaurant-ordering-system
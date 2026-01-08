# Telegram Bot - Panel de Administración y Cliente Público

Sistema web completo con chatbot inteligente, panel de administración CRUD y cliente público. Integra inteligencia artificial, búsqueda semántica y comunicación en tiempo real.

## Descripción

Aplicación web full-stack que combina un panel de administración para gestión de contenidos con una interfaz pública que incluye un chatbot asistido por IA. El sistema permite la gestión completa de usuarios, eventos, FAQs y otros recursos, mientras que los visitantes pueden interactuar con un asistente virtual inteligente y buscar productos mediante búsqueda semántica.

## Características Principales

-   Panel de administración con operaciones CRUD completas
-   Chatbot inteligente con OpenAI Assistant API
-   Búsqueda semántica de productos mediante vectorización
-   Escalamiento de conversaciones a operadores humanos vía Telegram
-   Sistema de notificaciones por email con templates personalizados
-   Comunicación en tiempo real con WebSockets
-   Gestión de eventos con sistema pub/sub mediante Redis
-   Interfaz responsive construida con Web Components

## Tecnologías

### Backend

-   Node.js con Express 5
-   MySQL con Sequelize (ORM)
-   MongoDB con Mongoose (ODM)
-   Redis para pub/sub y caché
-   ChromaDB para búsqueda vectorial

### Frontend

-   Vanilla JavaScript con Web Components
-   Redux Toolkit para gestión de estado
-   Vite como build tool
-   CSS moderno con animaciones avanzadas

### Servicios Externos

-   OpenAI API para el asistente virtual
-   Telegram Bot API para notificaciones
-   Gmail API con OAuth2 para envío de emails

## Estructura del Proyecto

    .
    ├── api/                      # Backend API
    │   ├── src/
    │   │   ├── controllers/      # Controladores de rutas
    │   │   ├── models/           # Modelos Sequelize y Mongoose
    │   │   ├── services/         # Servicios (OpenAI, Telegram, Email, WebSocket)
    │   │   ├── middlewares/      # Middlewares personalizados
    │   │   ├── routes/           # Definición de rutas
    │   │   ├── events/           # Sistema de eventos con Redis
    │   │   ├── migrations/       # Migraciones de base de datos
    │   │   └── templates/        # Templates de emails (EJS)
    │   └── index.js             # Punto de entrada
    │
    ├── client/
    │   ├── admin/               # Panel de administración
    │   │   └── front-admin/
    │   │       ├── pages/       # Páginas HTML
    │   │       └── src/
    │   │           ├── components/    # Web Components
    │   │           └── redux/         # Store y slices
    │   │
    │   └── customer/            # Cliente público
    │       ├── pages/
    │       └── src/
    │           └── components/  # Componentes (Hero, Chatbot, etc)
    │
    └── README.md

## Instalación

### Prerrequisitos

-   Node.js 18 o superior
-   MySQL 8.0 o superior
-   MongoDB 6.0 o superior
-   Redis 7.0 o superior

### Configuración

1.  Clonar el repositorio:

bash

    git clone https://github.com/usuario/telegram-bot.git
    cd telegram-bot

2.  Instalar dependencias:

bash

    # Backend
    cd api
    npm install
    
    # Cliente Admin
    cd ../client/admin/front-admin
    npm install
    
    # Cliente Customer
    cd ../../customer
    npm install

3.  Configurar variables de entorno:

Crear archivo `.env` en la carpeta `api/` basándose en `.env.example`:

env

    API_URL=http://localhost:8080
    NODE_ENV=development
    PORT=8080
    
    # Base de datos MySQL
    DATABASE_HOST=localhost
    DATABASE_USER=root
    DATABASE_PASSWORD=tu_password
    DATABASE_NAME=telegram-bot
    
    # MongoDB
    MONGODB_URI=mongodb://localhost:27017/telegram-bot
    
    # Redis
    REDIS_URL=redis://localhost:6379
    
    # OpenAI
    OPENAI_API_KEY=tu_api_key
    OPENAI_ASSISTANT_CHATBOT_ID=tu_assistant_id
    
    # Telegram
    TELEGRAM_ADMIN_TOKEN=tu_token
    TELEGRAM_ADMIN_CHAT_ID=tu_chat_id
    
    # Gmail OAuth2
    GOOGLE_EMAIL=tu_email
    GOOGLE_CLIENT_ID=tu_client_id
    GOOGLE_CLIENT_SECRET=tu_client_secret
    GOOGLE_REFRESH_TOKEN=tu_refresh_token

4.  Crear archivo de configuración de Sequelize:

Copiar `api/src/config/config-example.json` a `api/src/config/config.json` y ajustar credenciales.

5.  Ejecutar migraciones:

bash

    cd api
    npx sequelize-cli db:migrate

## Uso

### Desarrollo

Ejecutar en terminales separadas:

bash

    # API
    cd api
    npm run dev
    
    # Cliente Admin
    cd client/admin/front-admin
    npm run dev
    
    # Cliente Customer
    cd client/customer
    npm run dev

La aplicación estará disponible en:

-   API: [http://localhost:8080](http://localhost:8080/)
-   Admin: [http://localhost:5171](http://localhost:5171/)
-   Customer: [http://localhost:5177](http://localhost:5177/)

### Producción

bash

    # Backend
    cd api
    npm start
    
    # Construir frontends
    cd client/admin/front-admin
    npm run build
    
    cd ../../customer
    npm run build

## Funcionalidades Detalladas

### Panel de Administración

-   Gestión de usuarios y clientes
-   CRUD de eventos y categorías
-   Administración de FAQs
-   Gestión de contenido (Hero, Cards, Features)
-   Sistema de filtrado y paginación
-   Validación de formularios en cliente y servidor

### Cliente Público

-   Hero animado con efectos parallax
-   Sección de características con scroll sticky
-   Buscador con autocompletado semántico
-   Formulario de suscripción con validación
-   FAQs desplegables
-   Chatbot integrado

### Chatbot

-   Conversaciones persistentes por sesión
-   Búsqueda de productos en base vectorial
-   Escalamiento automático a operadores humanos
-   Notificaciones a Telegram cuando se requiere intervención
-   Respuestas en tiempo real vía WebSocket

## Base de Datos

### MySQL (Sequelize)

Gestiona entidades estructuradas: usuarios, eventos, emails, etc.

### MongoDB (Mongoose)

Almacena documentos flexibles: FAQs, configuración de Hero, Cards, conversaciones de chat.

### ChromaDB

Índice vectorial para búsqueda semántica de productos.

### Redis

Sistema pub/sub para eventos y caché de datos.




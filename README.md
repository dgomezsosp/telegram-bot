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

```
telegram-bot
├─ api
│  ├─ .env
│  ├─ .env.example
│  ├─ .sequelizerc
│  ├─ eslint.config.js
│  ├─ index.js
│  ├─ package.json
│  └─ src
│     ├─ app.js
│     ├─ config
│     │  ├─ config-example.json
│     │  └─ config.json
│     ├─ controllers
│     │  ├─ admin
│     │  │  ├─ bot-controller.js
│     │  │  ├─ card-controller.js
│     │  │  ├─ customer-bot-chat-controller.js
│     │  │  ├─ customer-bot-controller.js
│     │  │  ├─ customer-controller.js
│     │  │  ├─ customer-event-controller.js
│     │  │  ├─ email-controller.js
│     │  │  ├─ email-error-controller.js
│     │  │  ├─ event-category-controller.js
│     │  │  ├─ event-controller.js
│     │  │  ├─ event-occurrence-controller.js
│     │  │  ├─ event-price-controller.js
│     │  │  ├─ faq-controller.js
│     │  │  ├─ feature-title-controller.js
│     │  │  ├─ hero-controller.js
│     │  │  ├─ image-controller.js
│     │  │  ├─ language-controller.js
│     │  │  ├─ promoter-controller.js
│     │  │  ├─ promoter-spot-controller.js
│     │  │  ├─ sent-email-controller.js
│     │  │  ├─ spot-controller.js
│     │  │  ├─ subscription-form-controller.js
│     │  │  ├─ town-controller.js
│     │  │  ├─ user-controller.js
│     │  │  └─ user-credential-controller.js
│     │  ├─ auth
│     │  │  ├─ auth-activate-controller.js
│     │  │  ├─ auth-customer-controller.js
│     │  │  └─ auth-user-controller.js
│     │  ├─ auth-admin
│     │  └─ customer
│     │     ├─ card-controller.js
│     │     ├─ chat-controller.js
│     │     ├─ customer-controller.js
│     │     ├─ faq-controller.js
│     │     ├─ feature-title-controller.js
│     │     ├─ hero-controller.js
│     │     └─ product-controller.js
│     ├─ events
│     │  ├─ index.js
│     │  ├─ new-customer.js
│     │  └─ new-user.js
│     ├─ middlewares
│     │  ├─ auth-user-cookie.js
│     │  ├─ error-handler.js
│     │  ├─ expose-services.js
│     │  ├─ user-agent.js
│     │  └─ user-tracking.js
│     ├─ migrations
│     │  ├─ 20250425125700-create-customer-bot-chats-table.js
│     │  ├─ 20250425125700-create-customers-events-table.js
│     │  ├─ 20250425125700-create-email-errors-table.js
│     │  ├─ 20250425125700-create-emails-table.js
│     │  ├─ 20250425125700-create-event-occurrences-table.js
│     │  ├─ 20250425125700-create-event-prices-table.js
│     │  ├─ 20250425125700-create-events-table.js
│     │  ├─ 20250425125700-create-promoters-spots-table.js
│     │  ├─ 20250425125700-create-promoters-table.js
│     │  ├─ 20250425125700-create-sent-emails-table.js
│     │  ├─ 20250425125700-create-spots-table.js
│     │  ├─ 20250425125700-create-towns-table.js
│     │  ├─ 20250425125700-create-users-table.js
│     │  ├─ 20250430122500-create-customer-activation-tokens-table.js
│     │  ├─ 20250430122500-create-customer-credentials.js
│     │  ├─ 20250430122500-create-customer-reset-password-tokens-table.js
│     │  ├─ 20250430122500-create-customers-table.js
│     │  ├─ 20250430122500-create-promoter-activation-tokens-table.js
│     │  ├─ 20250430122500-create-promoter-credentials.js
│     │  ├─ 20250430122500-create-promoter-reset-password-tokens-table.js
│     │  ├─ 20250430122500-create-promoters-spots-table.js
│     │  ├─ 20250430122500-create-user-activation-tokens-table.js
│     │  ├─ 20250430122500-create-user-credentials.js
│     │  ├─ 20250430122500-create-user-reset-password-tokens-table.js
│     │  ├─ 20250508112300-create-bots-table.js
│     │  ├─ 20250508112300-create-customers-bots-table.js
│     │  └─ 20250508112300-create-event-categories-table.js
│     ├─ models
│     │  ├─ mongoose
│     │  │  ├─ card.js
│     │  │  ├─ chat.js
│     │  │  ├─ customer.js
│     │  │  ├─ event-price.js
│     │  │  ├─ faq.js
│     │  │  ├─ feature-title.js
│     │  │  ├─ hero.js
│     │  │  ├─ image.js
│     │  │  ├─ index.js
│     │  │  ├─ language.js
│     │  │  ├─ promoter.js
│     │  │  ├─ subscription-form.js
│     │  │  └─ user.js
│     │  └─ sequelize
│     │     ├─ bot.js
│     │     ├─ customer-activation-token.js
│     │     ├─ customer-bot-chat.js
│     │     ├─ customer-bot.js
│     │     ├─ customer-credential.js
│     │     ├─ customer-event.js
│     │     ├─ customer-reset-password-token.js
│     │     ├─ customer.js
│     │     ├─ email-error.js
│     │     ├─ email.js
│     │     ├─ event-category.js
│     │     ├─ event-occurrence.js
│     │     ├─ event-price.js
│     │     ├─ event.js
│     │     ├─ index.js
│     │     ├─ promoter-activation-token.js
│     │     ├─ promoter-credential.js
│     │     ├─ promoter-reset-password-token.js
│     │     ├─ promoter-spot.js
│     │     ├─ promoter.js
│     │     ├─ sent-email.js
│     │     ├─ spot.js
│     │     ├─ town.js
│     │     ├─ user-activation-token.js
│     │     ├─ user-credential.js
│     │     ├─ user-reset-password-token.js
│     │     └─ user.js
│     ├─ routes
│     │  ├─ admin
│     │  │  ├─ bots.js
│     │  │  ├─ cards.js
│     │  │  ├─ customer-bot-chats.js
│     │  │  ├─ customers-bots.js
│     │  │  ├─ customers-events.js
│     │  │  ├─ customers.js
│     │  │  ├─ email-errors.js
│     │  │  ├─ emails.js
│     │  │  ├─ event-categories.js
│     │  │  ├─ event-occurrences.js
│     │  │  ├─ event-prices.js
│     │  │  ├─ events.js
│     │  │  ├─ faqs.js
│     │  │  ├─ features-titles.js
│     │  │  ├─ hero.js
│     │  │  ├─ languages.js
│     │  │  ├─ promoters-spots.js
│     │  │  ├─ promoters.js
│     │  │  ├─ sent-emails.js
│     │  │  ├─ spots.js
│     │  │  ├─ subscription-forms.js
│     │  │  ├─ towns.js
│     │  │  ├─ user-credentials.js
│     │  │  └─ users.js
│     │  ├─ auth
│     │  │  ├─ auth-activates.js
│     │  │  ├─ auth-customers.js
│     │  │  └─ auth-users.js
│     │  ├─ auth-admin
│     │  ├─ customer
│     │  │  ├─ cards.js
│     │  │  ├─ chats.js
│     │  │  ├─ customers.js
│     │  │  ├─ faqs.js
│     │  │  ├─ features-titles.js
│     │  │  ├─ hero.js
│     │  │  └─ products.js
│     │  └─ index.js
│     ├─ seeders
│     │  └─ sequelize
│     ├─ services
│     │  ├─ authorization-service.js
│     │  ├─ email-service.js
│     │  ├─ expose-services.js
│     │  ├─ openai-service.js
│     │  ├─ telegram-service.js
│     │  └─ websocket-service.js
│     └─ templates
│        └─ emails
│           └─ es
│              ├─ activation-customer.ejs
│              └─ activation-url.ejs
├─ client
│  ├─ admin
│  │  ├─ auth-admin
│  │  │  ├─ .env
│  │  │  ├─ .env.example
│  │  │  ├─ eslint.config.js
│  │  │  ├─ images
│  │  │  ├─ index.html
│  │  │  ├─ package.json
│  │  │  ├─ pages
│  │  │  │  ├─ 404.html
│  │  │  │  └─ login.html
│  │  │  ├─ src
│  │  │  │  ├─ components
│  │  │  │  │  ├─ font-loader-component.js
│  │  │  │  │  ├─ login-component.js
│  │  │  │  │  ├─ not-found-component.js
│  │  │  │  │  └─ page-component.js
│  │  │  │  ├─ index.js
│  │  │  │  └─ redux
│  │  │  ├─ style.css
│  │  │  └─ vite.config.js
│  │  └─ front-admin
│  │     ├─ .env
│  │     ├─ .env.example
│  │     ├─ eslint.config.js
│  │     ├─ images
│  │     ├─ index.html
│  │     ├─ package.json
│  │     ├─ pages
│  │     │  ├─ 404.html
│  │     │  ├─ admin-dashboard.html
│  │     │  ├─ bots.html
│  │     │  ├─ cards.html
│  │     │  ├─ customers.html
│  │     │  ├─ event-categories.html
│  │     │  ├─ events.html
│  │     │  ├─ faqs.html
│  │     │  ├─ features-titles.html
│  │     │  ├─ form-emails.html
│  │     │  ├─ hero.html
│  │     │  ├─ languages.html
│  │     │  ├─ promoters.html
│  │     │  ├─ spots.html
│  │     │  ├─ subscription-forms.html
│  │     │  └─ users.html
│  │     ├─ src
│  │     │  ├─ components
│  │     │  │  ├─ admin-dashboard-component.js
│  │     │  │  ├─ delete-modal-component.js
│  │     │  │  ├─ filters
│  │     │  │  │  ├─ bots-filter-component.js
│  │     │  │  │  ├─ cards-filter-component.js
│  │     │  │  │  ├─ customers-filter-component.js
│  │     │  │  │  ├─ event-categories-filter-component.js
│  │     │  │  │  ├─ events-filter-component.js
│  │     │  │  │  ├─ faqs-filter-component.js
│  │     │  │  │  ├─ features-titles-filter-component.js
│  │     │  │  │  ├─ hero-filter-component.js
│  │     │  │  │  ├─ languages-filter-component.js
│  │     │  │  │  ├─ promoters-filter-component.js
│  │     │  │  │  ├─ spots-filter-component.js
│  │     │  │  │  ├─ subscription-forms-filter-component.js
│  │     │  │  │  └─ users-filter-component.js
│  │     │  │  ├─ font-loader-component.js
│  │     │  │  ├─ forms
│  │     │  │  │  ├─ bots-form-component.js
│  │     │  │  │  ├─ cards-form-component.js
│  │     │  │  │  ├─ customers-form-component.js
│  │     │  │  │  ├─ event-categories-form-component.js
│  │     │  │  │  ├─ events-form-component.js
│  │     │  │  │  ├─ faqs-form-component.js
│  │     │  │  │  ├─ features-titles-form-component.js
│  │     │  │  │  ├─ hero-form-component.js
│  │     │  │  │  ├─ languages-form-component.js
│  │     │  │  │  ├─ promoters-form-component.js
│  │     │  │  │  ├─ spots-form-component.js
│  │     │  │  │  ├─ subscription-forms-form-component.js
│  │     │  │  │  └─ users-form-component.js
│  │     │  │  ├─ header-component.js
│  │     │  │  ├─ main-component.js
│  │     │  │  ├─ menu-component.js
│  │     │  │  ├─ message-component.js
│  │     │  │  ├─ not-found-component.js
│  │     │  │  ├─ page-component.js
│  │     │  │  ├─ tables
│  │     │  │  │  ├─ bots-table-component.js
│  │     │  │  │  ├─ cards-table-component.js
│  │     │  │  │  ├─ customers-table-component.js
│  │     │  │  │  ├─ event-categories-table-component.js
│  │     │  │  │  ├─ events-table-component.js
│  │     │  │  │  ├─ faqs-table-component.js
│  │     │  │  │  ├─ features-titles-table-component.js
│  │     │  │  │  ├─ form-emails-table-component.js
│  │     │  │  │  ├─ hero-table-component.js
│  │     │  │  │  ├─ languages-table-component.js
│  │     │  │  │  ├─ promoters-table-component.js
│  │     │  │  │  ├─ spots-table-component.js
│  │     │  │  │  ├─ subscription-forms-table-component.js
│  │     │  │  │  └─ users-table-component.js
│  │     │  │  └─ title-component.js
│  │     │  ├─ index.js
│  │     │  └─ redux
│  │     │     ├─ crud-slice.js
│  │     │     └─ store.js
│  │     ├─ style.css
│  │     └─ vite.config.js
│  ├─ auth
│  │  ├─ .env
│  │  ├─ .env.example
│  │  ├─ app.css
│  │  ├─ eslint.config.js
│  │  ├─ images
│  │  ├─ index.html
│  │  ├─ package.json
│  │  ├─ pages
│  │  │  ├─ 404.html
│  │  │  └─ activation.html
│  │  ├─ src
│  │  │  ├─ components
│  │  │  │  ├─ activation-component.js
│  │  │  │  ├─ font-loader-component.js
│  │  │  │  ├─ not-found-component.js
│  │  │  │  └─ page-component.js
│  │  │  └─ index.js
│  │  └─ vite.config.js
│  └─ customer
│     ├─ .env
│     ├─ .env.example
│     ├─ app.css
│     ├─ eslint.config.js
│     ├─ images
│     │  ├─ airpods
│     │  │  ├─ go_airpods__ed69m4vdask2_large.png
│     │  │  ├─ go_airpods__ed69m4vdask2_large_2x.png
│     │  │  ├─ go_airpods__ed69m4vdask2_medium_2x.png
│     │  │  └─ go_airpods__ed69m4vdask2_small_2x.png
│     │  ├─ helpful
│     │  │  ├─ go_tile_2__r3t0enbq5lea_large.jpg
│     │  │  ├─ go_tile_2__r3t0enbq5lea_medium.jpg
│     │  │  └─ go_tile_2__r3t0enbq5lea_small.jpg
│     │  ├─ hero.webp
│     │  ├─ remind
│     │  │  ├─ go_tile_1__c3xn44p0q22q_large.png
│     │  │  ├─ go_tile_1__c3xn44p0q22q_medium.png
│     │  │  └─ go_tile_1__c3xn44p0q22q_small.png
│     │  └─ text
│     │     ├─ go_iphone__rgcqxe88k6y6_large.png
│     │     ├─ go_iphone__rgcqxe88k6y6_medium.png
│     │     └─ go_iphone__rgcqxe88k6y6_small.png
│     ├─ index.html
│     ├─ package.json
│     ├─ pages
│     │  ├─ 404.html
│     │  └─ home.html
│     ├─ src
│     │  ├─ components
│     │  │  ├─ cards-component.js
│     │  │  ├─ chatbot-component.js
│     │  │  ├─ faqs-component.js
│     │  │  ├─ features-titles-component.js
│     │  │  ├─ font-loader-component.js
│     │  │  ├─ hero-component.js
│     │  │  ├─ login-customer-component.js
│     │  │  ├─ not-found-component.js
│     │  │  ├─ page-component.js
│     │  │  ├─ search-bar-component.js
│     │  │  ├─ subscription-form-component.js
│     │  │  └─ topbar-component.js
│     │  └─ index.js
│     └─ vite.config.js
├─ package.json
├─ proxy.js
└─ README.md

```
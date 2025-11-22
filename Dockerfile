# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de package y configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Recibir los argumentos de build
ARG VITE_API_URL
ARG VITE_API_KEY
ARG VITE_API_TIMEOUT
ARG VITE_LIMIT_PROJECTS

# Definir como variables de entorno para que Vite las capture durante el build
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_KEY=${VITE_API_KEY}
ENV VITE_API_TIMEOUT=${VITE_API_TIMEOUT}
ENV VITE_LIMIT_PROJECTS=${VITE_LIMIT_PROJECTS}

# Construir la aplicación para producción
RUN npm run build-only

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
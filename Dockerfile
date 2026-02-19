# ── Stage 1: Build TypeScript ────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src/
RUN npm run build

# ── Stage 2: Runtime ─────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

# Ferramentas externas
RUN apk add --no-cache ffmpeg python3 py3-pip curl && \
    pip3 install --break-system-packages streamlink yt-dlp

# Dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Aplicação compilada
COPY --from=builder /app/dist ./dist
COPY public/ ./public/

# Volume para dados persistentes
VOLUME ["/data"]
ENV NODE_ENV=production
EXPOSE 8888

CMD ["node", "dist/server.js"]

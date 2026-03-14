FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG WC_URL
ARG WC_CONSUMER_KEY
ARG WC_CONSUMER_SECRET
ENV WC_URL=$WC_URL
ENV WC_CONSUMER_KEY=$WC_CONSUMER_KEY
ENV WC_CONSUMER_SECRET=$WC_CONSUMER_SECRET
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache libc6-compat && npm i -g sharp@0.33.2
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]

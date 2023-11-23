FROM node:16.17-alpine as base

RUN yarn global add pnpm

FROM base as dependencies

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install

FROM base as builder

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

FROM node:16.17-alpine

WORKDIR /app

COPY --from=builder /app/md ./md
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD [ "node", "server.js" ]

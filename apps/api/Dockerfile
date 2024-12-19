# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

# Install dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN chown -R node:node /usr/src/app/node_modules

COPY --chown=node:node . .

# Set variabel lingkungan secara langsung di Dockerfile
ENV DATABASE_URL=postgresql://postgres:root@db:5432/tahsin?schema=public
ENV JWT_SECRET=EVJcJtqzG2yLjgScB8bAM8iXLv54epqFurg9PFusS+M=
ENV REFRESH_JWT_SECRET=qjh8o9dKxBb71VI83wJXmkfLpaIgcvfRNfjgEIEanZU=

# Run prisma migrate and seed during build, only once
RUN npx prisma migrate deploy --schema /usr/src/app/apps/api/prisma/schema.prisma && \
    npx tsx /usr/src/app/apps/api/prisma/seed.ts

USER node

EXPOSE 5000

CMD npm run dev

# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Install dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Atur izin untuk folder node_modules
RUN chown -R node:node /usr/src/app/node_modules

# Copy seluruh source code
COPY --chown=node:node . .

# Run sebagai non-root user
USER node

# Expose port
EXPOSE 5000

# Perintah default
CMD npx prisma migrate dev --name init && \
    npx tsx prisma/seed.ts && \
    npm run dev

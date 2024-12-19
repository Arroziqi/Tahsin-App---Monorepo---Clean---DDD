# syntax = docker/dockerfile:1

ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine as base

LABEL fly_launch_runtime="NextJS"

FROM base AS deps

RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy root package.json and lockfile
COPY package*.json ./

RUN npm update && npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run build for the Next.js app
RUN npm run build

FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Create a system group and user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public and .next from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/.next/static ./static

# Set proper ownership for the .next folder
RUN chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

# Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production

# Copy built JavaScript files
COPY --from=builder /usr/src/app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeapp -u 1001
USER nodeapp

EXPOSE 3000

CMD ["node", "dist/app.js"]
# ---- Base build image ----
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Production image ----
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the necessary files for production
COPY --from=builder /app/package*.json ./
COPY .env .env
RUN npm ci --omit=dev

# Copy Next.js build output and other necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.js ./next.config.mjs

# (Optional) If you use custom server code (e.g., server.js), copy it too:
# COPY --from=builder /app/server.js ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]

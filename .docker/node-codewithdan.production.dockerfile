FROM node:22-alpine

LABEL author="Dan Wahlin"

WORKDIR /var/www/codewithdan

# Copy package files first for better layer caching
COPY --chown=node:node package.json package-lock.json tsconfig.json ./

ENV NODE_ENV=production

# Install dependencies (including devDependencies for TypeScript build)
RUN npm ci && \
    npm cache clean --force

# Copy source files
COPY --chown=node:node . .

# Build TypeScript to dist/
RUN npm run build:ts

# Run as non-root user for security
USER node

EXPOSE 8080

ENTRYPOINT [ "node", "dist/server.js" ] 

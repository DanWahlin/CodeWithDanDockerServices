FROM node:22-alpine

LABEL author="Dan Wahlin"

WORKDIR /var/www/codewithdan

# Copy package files first for better layer caching
COPY --chown=node:node package.json package-lock.json* tsconfig.json ./

# Install ALL dependencies (need devDependencies for TypeScript build)
# Using --legacy-peer-deps if there are peer dependency issues
RUN npm install --legacy-peer-deps || npm install --force

# Copy source files
COPY --chown=node:node . .

# Build TypeScript to dist/
RUN npm run build:ts

# Clean up devDependencies after build
RUN npm prune --production || true

# Run as non-root user for security
USER node

ENV NODE_ENV=production

EXPOSE 8080

ENTRYPOINT [ "node", "dist/server.js" ] 

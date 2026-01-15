FROM node:lts-alpine

LABEL author="Dan Wahlin"

WORKDIR /var/www/codewithdan

# Copy package files first for better layer caching
COPY --chown=node:node package.json package-lock.json ./

ENV NODE_ENV=production

# Install dependencies
RUN npm ci && \
    npm cache clean --force

# Copy application files
COPY --chown=node:node . .

# Run as non-root user for security
USER node

EXPOSE 8080

ENTRYPOINT [ "node", "server.js" ]

# To build:
# docker build -f docker-node-codewithdan.dockerfile --tag codewithdan_node ../

# To run:
# docker run -d -p 8080:8080 -v $(PWD):/var/www/codewithdan -w /var/www/codewithdan codewithdan_node
# docker run -d -p 8080:8080 --name codewithdan_node codewithdan_node 

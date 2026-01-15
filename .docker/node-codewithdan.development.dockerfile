FROM node:22-alpine

LABEL author="Dan Wahlin"

WORKDIR /var/www/codewithdan

EXPOSE 8080

# For development, build TypeScript and then run
# The volume mount will provide the source files
CMD sh -c "npm run build:ts && node dist/server.js"

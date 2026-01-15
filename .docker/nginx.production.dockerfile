FROM nginx:alpine

LABEL author="Dan Wahlin"

# Copy custom nginx config
COPY ./.docker/config/nginx.production.conf /etc/nginx/nginx.conf

# Copy static files
COPY ./public /var/www/public

# Copy SSL certificates
COPY ./.certs/server.crt /etc/nginx/server.crt
COPY ./.certs/server.key /etc/nginx/server.key
COPY ./.certs/dhparam.pem /etc/nginx/dhparam.pem

# Set proper permissions on SSL key
RUN chmod 600 /etc/nginx/server.key

EXPOSE 80 443

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]

# To build:
# docker build -f docker-nginx.dockerfile --tag danwahlin/nginx ../

# To run: 
# docker run -d -p 80:6379 --name nginx danwahlin/nginx
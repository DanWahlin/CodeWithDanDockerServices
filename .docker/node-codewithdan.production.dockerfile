FROM node:lts-alpine

LABEL author="Dan Wahlin"

WORKDIR /var/www/codewithdan

COPY ./package.json .
COPY ./package-lock.json .

ENV NODE_ENV production
# Legacy instruction being removed
# RUN npm install -g pm2@latest
RUN npm install

COPY    . .

RUN mkdir -p /var/log/pm2

EXPOSE 		8080

ENTRYPOINT [ "node", "server.js" ]

# Legacy version:
# ENTRYPOINT ["pm2", "start", "server.js","--name","codewithdan","--log","/var/log/pm2/pm2.log","--watch","--no-daemon"]



# To build:
# docker build -f docker-node-codewithdan.dockerfile --tag codewithdan_node ../

# To run:
# docker run -d -p 8080:8080 -v $(PWD):/var/www/codewithdan -w /var/www/codewithdan codewithdan_node
# docker run -d -p 8080:8080 --name codewithdan_node codewithdan_node 

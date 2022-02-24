FROM node:lts-alpine

LABEL author="Dan Wahlin"

WORKDIR /var/www/codewithdan

EXPOSE 		8080

ENTRYPOINT [ "node", "server.js" ]

# To build:
# docker build -f docker-node-codewithdan.dockerfile --tag codewithdan_node ../

# To run:
# docker run -d -p 8080:8080 -v $(PWD):/var/www/codewithdan -w /var/www/codewithdan codewithdan_node
# docker run -d -p 8080:8080 --name codewithdan_node codewithdan_node 

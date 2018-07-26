#### Docker Services Orchestration Demonstration

This is a demo application from the [Docker for Web Developers](https://www.pluralsight.com/courses/docker-web-development) course on Pluralsight that demonstrates how multiple services can be integrated and orchestrated using Docker and Docker Compose.

1. Install Docker CE for Mac or Docker CE for Windows from http://docker.com
1. Set APP_ENV environment variable (use "set" rather than "export" for Windows the windows command shell):

      `export APP_ENV=development`

1. Set your Docker Hub account (any string value will work if you don't have an account):

      `export DOCKER_ACCT=<yourHubUserName>`

1. Run `npm install` to install the Node.js dependencies for the project (when running containers in development mode since a volume is defined docker-compose.yml file)
1. Run `docker-compose build`
1. Run `docker-compose up`
1. Visit http://localhost in a browser
1. Live long and prosper

*Note:* You won't see any data in the page that displays in the browser. To seed the database run the following:

`docker exec -it node-codewithdan-1 sh`

`node dbSeeder.js`

Type `exit` and press `ctrl-c` to exit the shell. You can close the dbSeeder command prompt once you're done.

#### Note for Docker Toolbox Users

If you're on Docker Toolbox rather than Docker CE you may get an nginx gateway error when going to http://localhost. This is due
to "localhost" being used as the server name in .docker/config/nginx.development.conf (that works for Docker CE - the latest version - but not for Docker Toolbox). Comment out the existing "server_name" property and
uncomment the one mentioned for Docker Toolbox in the .docker/config/nginx.development.conf file.
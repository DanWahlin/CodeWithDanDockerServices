#### Docker Services Orchestration Demonstration

This is a demo application from the [Docker for Web Developers](https://www.pluralsight.com/courses/docker-web-development) course on Pluralsight 
that demonstrates how multiple services can be integrated and orchestrated using Docker and Docker Compose.

1. Install Docker for Mac or Docker for Windows from http://docker.com
1. Set APP_ENV environment variable (using "set" rather than "export" for Windows):

      `export APP_ENV=development`

1. Set your Docker Hub account (any string value will work if you don't have an account):

      `export DOCKER_ACCT=<yourHubUserName>`

1. Run `docker-compose build`
1. Run `docker-compose up`
1. Visit http://localhost in a browser
1. Live long and prosper

*Note:* You won't see any data in the page that displays in the browser. To seed the database run the following:

`docker exec -it node-codewithdan-1 bash`

`node dbSeeder.js`

Press `ctrl-c` to exit the shell. You can close the dbSeeder command prompt once you're done.
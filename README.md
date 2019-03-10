#### Docker Services Orchestration Demonstration

This is a demo application from the [Docker for Web Developers](https://www.pluralsight.com/courses/docker-web-development) course on Pluralsight that demonstrates how multiple services can be integrated and orchestrated using Docker and Docker Compose.

1. Install Docker CE for Mac or Docker CE for Windows from https://docker.com and the lastest LTS version of Node.js from https://nodejs.org.
1. Set the environment variables in your command window.

      `export APP_ENV=development`
      `export DOCKER_ACCT=codewithdan`

      NOTE: For the Windows DOS command shell use `set` instead of `export`. For Windows Powershell use `$env:APP_ENV = "value"`.

1. Run `npm install` to install the Node.js dependencies for the project (when running containers in development mode since a volume is defined docker-compose.yml file)
1. Run `docker-compose build`
1. Run `docker-compose up`
1. Visit http://localhost in a browser
1. Live long and prosper

#### Note for Docker Toolbox Users

If you're on Docker Toolbox rather than Docker CE you may get an nginx gateway error when going to http://localhost. This is due
to "localhost" being used as the server name in .docker/config/nginx.development.conf (that works for Docker CE - the latest version - but not for Docker Toolbox). Comment out the existing "server_name" property and
uncomment the one mentioned for Docker Toolbox in the .docker/config/nginx.development.conf file.

#### To run in Kubernetes with Docker Desktop on Mac

1. Enable Kubernetes in Docker Desktop (Mac).

      Note: `You MUST have Docker Desktop` for this particular demo to work. 

1. Do a `production` Docker Compose build (see `docker-compose.yml` for instructions on doing the build) to create the local images
1. Open a command-prompt at the root of the project
1. Run `kubectl create -f .k8s` to create the Kubernetes Services, Deployments, Pods, etc.
1. Once the deployments are applied several pods will be created. 
1. Open the browser and go to http://localhost. 

This demo includes a LoadBalancer service for nginx which is why you can hit http://localhost. 
To expose a specific port for localhost for the nginx Pod, get the name of the `nginx` pod by running 
`kubectl get pods` and use the pod name in the following command:

`sudo kubectl port-forward [name-of-nginx-pod] 8080:80`

Note that sudo is needed to enable port 80 in this case on Mac. You can choose a different port as well such as 8081:80. If on Windows run the command window as administrator.


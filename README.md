## Docker Services Orchestration Demonstration (Kubernetes Orchestration demo also available)

This is a demo application from the [Docker for Web Developers](https://www.pluralsight.com/courses/docker-web-development) course on Pluralsight that demonstrates how multiple services can be integrated and orchestrated using Docker and Docker Compose.

## Running Docker with WSL (Windows Subsystem for Linux) on Windows?

Open a WSL (Linux) command prompt and clone the repo from there into a folder of your choosing. For example you can `cd` into `desktop` and put it there if you'd like.

`git clone https://github.com/danwahlin/codewithdandockerservices.git`

Ensure that Node is installed into your Linux instance (see https://docs.microsoft.com/windows/nodejs/setup-on-wsl2?WT.mc_id=m365-0000-dwahlin).

Note that if you're NOT using WSL at all with Docker on Windows then you can clone the repo from any Windows command prompt.

## Instructions

1. Install Docker Desktop for Mac or Docker Desktop for Windows from https://docker.com and the lastest LTS version of Node.js from https://nodejs.org.
1. Set the environment variables in your command window.

      `export APP_ENV=development`
      
      `export DOCKER_ACCT=codewithdan`

      NOTE: For the Windows DOS command shell use `set` instead of `export`. For Windows Powershell use `$env:KEY = "value"`:

      `$env:APP_ENV="production"`

      `$env:DOCKER_ACCT="codewithdan"`

1. Run `npm install` to install the Node.js dependencies for the project (when running containers in development mode since a volume is defined docker-compose.yml file)
1. Run `docker-compose build`
1. Run `docker-compose up`
1. Visit http://localhost in a browser
1. Live long and prosper

### Note for Docker Toolbox Users

If you're on Docker Toolbox rather than Docker CE you may get an nginx gateway error when going to http://localhost. This is due
to "localhost" being used as the server name in .docker/config/nginx.development.conf (that works for Docker Desktop - the latest version - but not for Docker Toolbox). Comment out the existing "server_name" property and
uncomment the one mentioned for Docker Toolbox in the .docker/config/nginx.development.conf file.

### To run in Kubernetes with Docker Desktop

1. Enable Kubernetes in Docker Desktop.

      Note: `You MUST have Docker Desktop` for this particular demo to work or another local Kubernetes option such as Minikube.

1. Do a `production` Docker Compose build (see `docker-compose.yml` for instructions on doing the build) to create the local images. Ensure that you set
APP_ENV=production as mentioned in the compose file.
1. Open a command-prompt at the root of the project
1. Run the following to add the database passwords as secrets (yes - these are simple passwords for the demo :-)):

    `kubectl create secret generic db-passwords --from-literal=db-password='password' --from-literal=db-root-password='password'`

    Note: `password` is being used here purely to keep things very simple for the demo. Use strong passwords for a "real" setup!!!!

1. Run `kubectl create -f .k8s` to create the Kubernetes Services, Deployments, Pods, etc.
1. Once the deployments are applied several pods will be created. 
1. Open the browser and go to http://localhost. Read note below.

NOTE: You'll need to wait since it'll take a little bit for the DB to start up. Once the Pods are ready you should see data in the app (hit refresh if needed).

1. When you're done run `kubectl delete -f .k8s` to delete the Kubernetes resources. 

### Local Storage Hostname Volume

NOTE: The local storage hostname volume is commented out in the `.k8s/mongo.deployment.yml` StatefulSet because MongoDB doesn't support that type of volume
correctly on Docker for Windows. It does work on Mac/Linux. You'd need to create a `/tmp/data/db` directory and then uncomment the
`volumes` and `volumeMounts` properties (and sub-properties) in the StatefulSet to actually use the volume on Mac/Linux.

### Load Balancer versus Port Forwarding

This demo includes a LoadBalancer service for the nginx Pod which is why you can hit http://localhost. 
To expose a specific port for localhost for the nginx Pod, get the name of the `nginx` pod by running 
`kubectl get pods` and use the pod name in the following command:

`sudo kubectl port-forward [name-of-nginx-pod] 8080:80`

Note that sudo is needed to enable port 80 in this case on Mac. You can choose a different port as well such as 8081:80. 

### Running with Skaffold

1. Open a command-prompt at the root of the project
1. Run the following to add the database passwords as secrets (yes - these are simple passwords for the demo :-)):

    `kubectl create secret generic db-passwords --from-literal=db-password='password' --from-literal=db-root-password='password'`

    Note: `password` is being used here purely to keep things very simple for the demo. Use strong passwords for a "real" setup!!!!

1. Install Skaffold from https://skaffold.dev. 
1. Run the following command at the root of the project:

      ```
      skaffold dev
      ```


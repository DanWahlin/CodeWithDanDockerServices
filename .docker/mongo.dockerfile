FROM mongo:latest

LABEL author="Dan Wahlin"

# Update packages and install necessary tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    cron \
    netcat-traditional \
    netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

COPY ./.docker/mongo_scripts /mongo_scripts

# Set proper permissions for scripts
RUN chmod +rx /mongo_scripts/*.sh && \
    touch /.firstrun

EXPOSE 27017

ENTRYPOINT ["bash","/mongo_scripts/run.sh"]


# To build:
# docker build -f mongo.dockerfile --tag danwahlin/mongo ../

# To run the image (add -d if you want it to run in the background)
# docker run -p 27017:27017 --env-file .docker/mongo.development.env -d --name mongo danwahlin/mongo

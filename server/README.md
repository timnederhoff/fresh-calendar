# Fresh Calendar server (backend)

## Prerequisites
* make sure a mongodb database is running. For example, use docker:
  ```shell
     docker run -d --rm \
     --name mongo-fresh-calendar \
     -e MONGO_INITDB_ROOT_USERNAME=root \
     -e MONGO_INITDB_ROOT_PASSWORD=example \
     -p 8082:27017 \
     mongo:latest
  ```
* set the uri of the mongodb database instance as an environment variable `ATLAS_URI`. Preferably in the `.env` file

# Redis Pub/Sub

Install the dependencies:

```bash
npm install
```

Set the environment variables:

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

````bash
# run all tests
npm test

# run all tests in watch mode
npm test:watch


Docker:

# run docker container in development mode
npm docker:dev

# run docker compose for redis
docker-compose up -d


## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

# Port number
PORT=8000

# URL of the Mongo DB
MONGODB_URL=mongodb+srv://Vectormike:Redeemer@cluster0.widnr.mongodb.net/test




### API Endpoints

List of available routes:

**Publish routes**:\
`POST /v1/publish/:topic` - publish a topic\

**Subscribe routes**:\
`POST /v1/subscribe/:topic` - create and subscribe to a topic\
```
````

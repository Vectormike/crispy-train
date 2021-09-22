const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const { createClient } = require('redis');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const topicModel = require('./models/topic.model');
const logger = require('./config/logger');

const subscriber = createClient();

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/v1', routes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Pub/Sub Application',
  });
});

// Query topics and set routes using url dynamically
let subscribeTopics;
try {
  subscribeTopics = async () => {
    const topics = await topicModel.find();
    if (topics[0].urls === undefined) return;

    subscriber.on('message', (channel, message) => {
      logger.info(`Received data :${message}`);
    });

    topics.map((topic) => {
      // Subscribe to topic
      subscriber.subscribe(`${topic.topic}`);

      // Loop and set routes
      topic.urls.map((url) => {
        app.get(`/${url.url}`, (req, res) => res.send({ message }));
      });
    });
  };
} catch (error) {
  logger.error(error, 'error');
}

subscribeTopics();

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

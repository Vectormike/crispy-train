/* eslint-disable no-unused-expressions */
const redis = require('redis');
const { redisHost, redisPort } = require('./config');
const logger = require('./logger');

const client = redis.createClient();

const set = (key, value) => {
  client.setex(key, 200, JSON.stringify(value));
};

const get = (req, res, next) => {
  const key = req.route.path;
  client.get(key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};

const publish = (req, res, next) => {
  const body = {
    message: 'hello',
  };

  const data = JSON.stringify(req.body.message) || JSON.stringify(body);

  const client = redis.createClient();

  client.publish('uLesson-topic', data, (error, data) => {
    console.log('Data:', data);
    if (error) res.status(400).send(error);
    if (data !== null) res.sendStatus(200).send(JSON.parse(data));
    else next();
  });
};

const subscribe = (req, res, next) => {
  const client = redis.createClient();

  client.on('message', (channel, message) => {
    logger.info('Recieved data:' + message);
  });

  client.subscribe('uLesson-topic');
};

module.exports = { set, get, publish, subscribe };

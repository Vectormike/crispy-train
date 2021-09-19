/* eslint-disable no-unused-expressions */
const { createClient } = require('redis');
const logger = require('./logger');

const client = createClient();

client.on('connect', () => {
  logger.info('Client connected to redis...');
});

client.on('ready', () => {
  logger.info(' Client connected to redis and ready to use... 🔥');
});

client.on('error', (err) => {
  logger.info(err.message);
});

client.on('end', () => {
  console.log('Client disconnected from redis');
});

// const set = (key, value) => {
//   client.setex(key, 200, JSON.stringify(value));
// };

// const get = (req, res, next) => {
//   const key = req.route.path;
//   client.get(key, (error, data) => {
//     if (error) res.status(400).send(err);
//     if (data !== null) res.status(200).send(JSON.parse(data));
//     else next();
//   });
// };

const publish = async (params) => {
  const body = {
    message: 'hello',
  };

  let uLessonTopic = params.topic;

  let response = await client.publish(`${uLessonTopic}`, JSON.stringify(body));

  if (response === true) return uLessonTopic;
  if (response === false) logger.error('Topic not published!');
};

const subscribe = async (params) => {
  const subscriber = createClient();

  let { topic } = params;
  let uLessonTopic = JSON.stringify(topic);
  console.log(uLessonTopic);
  subscriber.on('message', (channel, message) => {
    console.log('Received data :' + message);
  });
  const res = subscriber.subscribe('user-notify');
  console.log(res);
};

module.exports = { publish, subscribe };

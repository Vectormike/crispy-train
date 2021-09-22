const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const topicModel = require('../models/topic.model');
const { publish } = require('../config/redis');

const publishTopic = catchAsync(async (req, res) => {
  const { topic } = req.params;
  const { message } = req.body;

  // query topic and append message if exists
  const savedTopic = await topicModel.findOne({ topic });
  if (savedTopic) {
    savedTopic.message = message;
    await savedTopic.save();

    // publish message to topic's channel
    const { response, uLessonTopic } = await publish(topic, message);
    return res.status(httpStatus.OK).json({ response, uLessonTopic });
  }

  return res.status(httpStatus.OK).send('Topic does not exist');
});

module.exports = {
  publishTopic,
};

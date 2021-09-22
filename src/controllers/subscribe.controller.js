const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const topicModel = require('../models/topic.model');

const subscribetoTopic = catchAsync(async (req, res) => {
  const { topic } = req.params;
  const url = req.body;

  // check if topic already exist
  const topicExist = await topicModel.findOne({ topic });
  if (!topicExist) {
    const newTopic = await topicModel({
      topic,
      urls: url,
    });
    const response = await newTopic.save();
    return res.status(httpStatus.CREATED).json(response);
  }

  // Append url if topic exists
  topicExist.urls.push(url);
  await topicExist.save();
  return res.status(httpStatus.CREATED).json(topicExist);
});

module.exports = {
  subscribetoTopic,
};

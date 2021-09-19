const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { publish } = require('../config/redis');

const publishTopic = catchAsync(async (req, res) => {
  const response = await publish(req.params, res);
  console.log(response);
  return res.status(httpStatus.OK).send(`Topic is ${response}!`);
});

module.exports = {
  publishTopic,
};

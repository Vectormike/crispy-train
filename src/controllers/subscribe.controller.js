const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subscribe } = require('../config/redis');

const subscribetoTopic = catchAsync(async (req, res) => {
  const response = await subscribe(req.params);
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  subscribetoTopic,
};

const httpStatus = require('http-status');
const publishService = require('./publish.service');
const ApiError = require('../utils/ApiError');

/**
 * Publish event
 * @param {string} message
 * @returns {Promise<>}
 */
const publish = async (email, password) => {
  // const user = await publishService.getUserByEmail(email);
  // if (!user ) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  // }
  // return user;
};


module.exports = {
publish
};

const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const app = require('../../src/app');
const config = require('../../src/config/config');
const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Publish route', () => {
  describe('POST /v1/publish/:topic', () => {
    test('should return 400 error if email is invalid', async () => {
      await request(app).post('/v1/auth/register').send().expect(httpStatus.BAD_REQUEST);
    });
  });
});

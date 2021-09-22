const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Topic } = require('../../src/models');

setupTestDB();

describe('Subscribe route', () => {
  test('', async () => {
    await request(app)
      .patch(`/v1/subscribe/${}`)
      .send(updateBody)
      .expect(httpStatus.BAD_REQUEST);
  })
});

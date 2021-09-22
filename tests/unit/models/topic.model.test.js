const faker = require('faker');
const { Topic } = require('../../../src/models');

describe('Topic model', () => {
  describe('Topic validation', () => {
    let newTopic;
    beforeEach(() => {
      newTopic = {
        topic: faker.name.findName(),
        message: faker.name.findName(),
      };
    });

    test('should correctly validate a valid a topic', async () => {
      await expect(new Topic(newTopic).validate()).resolves.toBeUndefined();
    });
  });
});

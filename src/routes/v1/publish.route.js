const express = require('express');
const publishController = require('../../controllers/publish.controller');
const { get } = require('../../config/redis');
const router = express.Router();

router.post('/:topic', get, publishController.publishTopic);

module.exports = router;

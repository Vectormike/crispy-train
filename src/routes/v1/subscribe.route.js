const express = require('express');
const subscribeController = require('../../controllers/subscribe.controller');

const router = express.Router();

router.route('/:topic').post(subscribeController.subscribetoTopic);

module.exports = router;

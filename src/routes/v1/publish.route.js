const express = require('express');
const publishController = require('../../controllers/publish.controller');

const router = express.Router();

router.route('/:topic').post(publishController.publishTopic);

module.exports = router;

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/subscribe.controller');

const router = express.Router();

router
  .route('/subscribe')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)

module.exports = router;


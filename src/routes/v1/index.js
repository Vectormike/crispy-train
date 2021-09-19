const express = require('express');
const publishRoute = require('./publish.route');
const subscribeRoute = require('./subscribe.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/publish',
    route: publishRoute,
  },
  {
    path: '/subscribe',
    route: subscribeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

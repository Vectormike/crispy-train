const express = require('express');
const publishRoute = require('./publish.route');
const subscribeRoute = require('./subscribe.route');
const config = require('../../config/config');

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

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

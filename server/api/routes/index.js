const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();

/**
 * GET api
 */
router
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    next();
  })
  .get((req, res) => {
    res.end('OK\nRoute: /api.\nMethod: GET.');
  })
  .post((req, res) => {
    res.end(req.body.msg);
    console.log(req.body.msg);
  });

/**
 * GET api/docs
 */
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;

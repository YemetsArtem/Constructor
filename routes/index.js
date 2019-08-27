const express = require('express');
const router = express.Router();
const surveys =  [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/survey', function(req, res, next) {
  res.send(surveys);
});

router.post('/survey', function(req, res, next) {
  surveys.push(req.body);
  res.end();
});

module.exports = router;

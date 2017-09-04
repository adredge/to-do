const express = require('express')

const router = express.Router()

router.get('/list/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('userId: ', userId);
  res.json([{name: "Item One", id: 1, complete: false, completedAt: null}, {name: "Item Two", id: 2, complete: false, completedAt: null}, {name: "Item Three", id: 3, complete: true, completedAt: '2017-07-06T16:43:41Z'}]);
});

module.exports = router
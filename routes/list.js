const express = require('express')
const toDoListFacade = require('../to-do-list/facade.js')

const router = express.Router()

router.get('/list/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('userId: ', userId);
  return toDoListFacade.getDefaultToDoList(userId).then(vm => res.json(vm))
  // res.json([{name: "Item One", id: 1, complete: false, completedAt: null}, {name: "Item Two", id: 2, complete: false, completedAt: null}, {name: "Item Three", id: 3, complete: true, completedAt: '2017-07-06T16:43:41Z'}]);
});

module.exports = router
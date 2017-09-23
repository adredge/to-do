const express = require('express')
const toDoListFacade = require('../to-do-list/facade.js')

const router = express.Router()

router.get('/list/:userId', (req, res) => {
  const userId = req.params.userId;
  return toDoListFacade.getDefaultToDoList(userId).then(vm => res.json(vm))
});

router.post('/checkItem', (req,res) => {
  const itemId = req.body.itemId;
  const completedAt = req.body.completedAt
  return toDoListFacade.checkItem(itemId, completedAt).then(vm => res.json(vm))
});

router.post('/uncheckItem', (req,res) => {
  const itemId = req.body.itemId;
  return toDoListFacade.uncheckItem(itemId).then(() => res.status(200).end())
});

router.post('/addItem', (req, res) => {
  return toDoListFacade.addItem(req.body).then(vm => res.json(vm))
});

router.post('/removeItem', (req, res) => {
  return toDoListFacade.removeItem(req.body).then(vm => res.json(vm))
});

module.exports = router
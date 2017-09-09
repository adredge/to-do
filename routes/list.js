const express = require('express')
const toDoListFacade = require('../to-do-list/facade.js')
const wrap = require('./wrap')

const router = express.Router()

router.get('/list/:userId', (req, res) => {
  const userId = req.params.userId;
  return toDoListFacade.getDefaultToDoList(userId).then(vm => res.json(vm))
});

router.post('/checkItem', wrap((req,res) => {
  const itemId = req.body.itemId;
  const completedAt = req.body.completedAt
  return toDoListFacade.checkItem(itemId, completedAt).then(vm => {
    console.log('vm', vm)
    res.json(vm)
  })
}));

router.post('/uncheckItem', wrap((req,res) => {
  const itemId = req.body.itemId;
  return toDoListFacade.uncheckItem(itemId).then(() => res.status(200).end())
}));

module.exports = router
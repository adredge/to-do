'use strict'

const toDoListRepository = require('./repository')

module.exports = {
  getDefaultToDoList(userId) {
    return toDoListRepository.getList(userId)
  },

  checkItem(itemId, completedAt) {
    return toDoListRepository.checkItem(itemId, completedAt)
  },

  uncheckItem(itemId) {
    return toDoListRepository.uncheckItem(itemId)
  }
}
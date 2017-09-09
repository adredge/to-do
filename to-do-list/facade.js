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
  },

  addItem(addItemDetails) {
    return toDoListRepository.addItem(addItemDetails.userId, addItemDetails.listId, addItemDetails.newItemName)
  },

  removeItem(removeItemDetails) {
    return toDoListRepository.removeItem(removeItemDetails.itemId, removeItemDetails.listId, removeItemDetails.userId)
  }
}
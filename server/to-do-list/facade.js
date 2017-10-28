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

  addItem(userId, addItemDetails) {
    return toDoListRepository.addItem(userId, addItemDetails.listId, addItemDetails.newItemName)
  },

  removeItem(userId, removeItemDetails) {
    console.log('remove', userId, removeItemDetails.listId, removeItemDetails.itemId)
    return toDoListRepository.removeItem(userId, removeItemDetails.listId, removeItemDetails.itemId)
  }
}
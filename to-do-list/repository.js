'use strict'

const mongoose = require('mongoose')
const {ToDoList, Item} = require('./schema')

var getList = function(userId) {
    return ToDoList.findOne({'userId':userId}).populate('items').exec((err, toDoList) => {
        if(err) return console.error("ERROR!", err)
        return toDoList
    })
}

var checkItem = function(itemId, completedAt) {
    return Item.findById(itemId, (err, item) => {
        if (err) return console.error(err)
        if(item === null) return console.error('Unable to find item with id ', itemId)
  
        item.set({ complete: true, completedAt });
        item.save(function (err, updatedItem) {
            if (err) return console.error(err)
            return updatedItem
        })
    })
}

var uncheckItem = function(itemId) {
    return Item.findById(itemId, (err, item) => {
        if (err) return console.error(err)
        if(item === null) return console.error('Unable to find item with id ', itemId)
  
        item.set({ complete: false, completedAt: null });
        item.save(function (err, updatedItem) {
            if (err) return console.error(err)
            return updatedItem
        })
    })
}

module.exports = {getList, checkItem, uncheckItem}
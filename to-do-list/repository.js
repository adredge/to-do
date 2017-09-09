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

var addItem = function(userId, listId, newItemName){
    var item = new Item({name: newItemName, complete: false})

    return item.save().then(() => {
        return ToDoList.findOne({'userId':userId, '_id':listId}).then(toDoList => {
            if(!toDoList) {
                console.log("Unable to find list to add to")
                return {}
            }
            toDoList.items.push(item._id)

            return toDoList.save()
                .then(() => {
                    return ToDoList.findOne({'userId':userId, '_id':listId}).populate('items')
                        .then(list => list)
                        .catch(err => console.error("Error finding list just saved", err))
                })
                .catch(err => { console.error("error saving list with new item ref", err)
                })
        })
        .catch(err => console.error("ERROR finding list to add to", err))
    })
    .catch(err => console.error("error creating new item", err))
}

var removeItem = function(itemId, listId, userId){
    return ToDoList.findOne({'_id':listId}).then(toDoList => {
            if(!toDoList) {
                console.log("Unable to find list to remove from")
                return
            }
            var itemIndexToRemove = toDoList.items.indexOf(itemId)
            if (itemIndexToRemove > -1) {
                toDoList.items.splice(itemIndexToRemove, 1);
            }

            return toDoList.save()
                .then(() => {
                    return Item.findByIdAndRemove(itemId).then(() => {
                        return ToDoList.findOne({'userId':userId, '_id':listId}).populate('items')
                            .then(list => list)
                            .catch(err => console.error("Error finding list just saved", err))
                    })
                    .catch(err => console.log("error removing item", err))
                })
                .catch(err => console.error("error saving list with item removed", err))
        })
        .catch(err => console.error("ERROR finding list to remove from", err))
}

module.exports = {getList, checkItem, uncheckItem, addItem, removeItem}
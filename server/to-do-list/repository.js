'use strict'

const mongoose = require('mongoose')
const {ToDoList, Item} = require('./schema')

const getList = function(userId) {
    return ToDoList.findOne({'userId':userId}).populate('items').exec((err, toDoList) => {
        if(err) return console.error("ERROR!", err)
        return toDoList
    })
}

const createEmptyList = function(userId, listName){ 
    const toDoList = new ToDoList(
                {name: listName, 
                userId, 
                items: []
            })
            
            return toDoList.save(function(err, savedList){
                if(err) return console.error(err)
                return savedList
            })
}

const addItem = function(userId, listId, newItemName){
    const item = new Item({name: newItemName, complete: false})

    return ToDoList.findOne({'userId':userId, '_id':listId}).then(toDoList => {
        if(!toDoList) {
            return {}
        }
        return item.save().then(() => {
            toDoList.items.push(item._id)

            return toDoList.save().then(() => {
                return ToDoList.findOne({'userId':userId, '_id':listId}).populate('items')
                    .then(list => list)
                    .catch(err => console.error("ERROR finding list just saved", err))
            })
            .catch(err => console.error("ERROR saving list with new item ref", err))
        })
        .catch(err => console.error("ERROR saving item", err))
    }).catch(err => console.error("ERROR finding list to add item to", err))
}

const checkItem = function(itemId, completedAt) {
    return Item.findById(itemId).then(item => {
        if(!item ) return Promise.reject('Unable to find item with id ' + itemId)
  
        item.set({ complete: true, completedAt });
        return item.save().then(() => item).catch(err => console.error("ERROR saving completed item", err))   
    })
}

const uncheckItem = function(itemId) {
     return Item.findById(itemId).then(item => {
        if(!item ) return Promise.reject('Unable to find item with id ' + itemId)

        item.set({ complete: false, completedAt: null })
        return item.save().then(() => item).catch(err => console.error("ERROR saving completed item", err))   
    })
}



const removeItem = function(userId, listId, itemId){
    return ToDoList.findOne({'_id':listId}).then(toDoList => {
        if(!toDoList) return
        
        const itemIndexToRemove = toDoList.items.indexOf(itemId)
        if (itemIndexToRemove > -1) {
            toDoList.items.splice(itemIndexToRemove, 1);
        }
        return toDoList.save().then(() => {
            return Item.findByIdAndRemove(itemId).then(() => {
                return ToDoList.findOne({'userId':userId, '_id':listId})
                //.populate('items')
                .then(list => list)
            })
        })
    })
}

module.exports = {createEmptyList, getList, checkItem, uncheckItem, addItem, removeItem}
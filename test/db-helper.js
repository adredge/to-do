"use strict"

const mongoose = require('mongoose')
const {ToDoList, Item} = require('../server/to-do-list/schema')
const repository = require('../server/to-do-list/repository')

const deleteEntireList = function(userId, listId) {
    console.log(userId, listId)
    return ToDoList.findOne({'userId':userId}).populate('items')
    .exec((err, toDoList) => {
        if(err) {
            console.error("ERROR retrieving list to delete", err)
            return Promise.reject()
        }

        if(!toDoList) {
            console.log("To do list not found for removal")
            return Promise.resolve()
        }

        return Promise.all(toDoList.items.map(item => Item.findByIdAndRemove(item._id)))
        .then(toDoList.remove())
    })   
}

module.exports = {deleteEntireList}
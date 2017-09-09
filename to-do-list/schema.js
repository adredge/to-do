"use strict"

const mongoose = require('mongoose')
const uuid = require('uuid')

var itemSchema = mongoose.Schema(
    {name:String, 
    complete: Boolean, 
    completedAt: Date},
    { collection: 'items' }
)

var Item = mongoose.model('Item', itemSchema)

var listSchema = mongoose.Schema(
    {   name: String, 
        userId: String,
        items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    },
    { collection: 'lists' }
)

var ToDoList = mongoose.model('ToDoList', listSchema)

function createDefaultList(userId) {
    listExistsForUser(userId).then(listExists => {
        if(listExists) return
        else {
            var item1 = new Item({name: "Foo Item", complete: false, completedAt: null})
            var item2 = new Item({name: "Item Two", complete: false, completedAt: null})
            var item3 = new Item({name: "Item Bar", complete: true, completedAt: '2017-07-06T16:43:41Z'})

            item1.save(function(err, callback){
                if(err) return console.error(err)
            })
            item2.save(function(err, callback){
                if(err) return console.error(err)
            })
            item3.save(function(err, callback){
                if(err) return console.error(err)
            })

            var defaultToDoList = new ToDoList(
                {name: "TEST LIST", 
                userId: userId, 
                items: [item1._id, item2._id, item3._id]
            })
            
            defaultToDoList.save(function(err, callback){
                if(err) return console.error(err)
            })
        }
    })
}

function listExistsForUser(userId) {
    return ToDoList.findOne({'userId':userId}).exec((err, toDoList) => {
        if(err) return false;
        return toDoList != null
    })
}

module.exports = {
    Item,
    ToDoList,
    createDefaultList,
    listExistsForUser
}
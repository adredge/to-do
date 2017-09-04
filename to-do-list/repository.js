'use strict'

const mongoose = require('mongoose')
const {ToDoList} = require('./schema')

var getList = function(userId) {
    console.log('userid', userId)
    console.log('ToDoList', ToDoList)
    return ToDoList.find().exec((err, toDoList) => {
        if(err) return console.error("ERROR!", err) //{'userId:':userId}
        return toDoList
    })
}

module.exports = {getList}
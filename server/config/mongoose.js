const mongoose = require('mongoose')
const toDoListModel = require('../../to-do-list/schema')

module.exports = function(url) {
    mongoose.connect(url)
    var db = mongoose.connection
    var db = mongoose.connection; 
    db.on('error', function (err) {
        console.log('connection error...', err);
    });
    db.once('open', function () {
        console.log('connected to todo database.');
    });

    toDoListModel.createDefaultList()
};
const mongoose = require('mongoose')
const toDoListModel = require('../../to-do-list/schema')

module.exports = function(config, env) {
    mongoose.connect(config.db)
    var db = mongoose.connection
    db.on('error', function (err) {
        console.log('connection error...', err);
    });
    db.once('open', function () {
        console.log('connected to todo database.');
    });

    if(env == 'development')
        toDoListModel.createDefaultList(config.defaultUserId)
};
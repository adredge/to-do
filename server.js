const express = require("express");

var app = express();

console.log("HERE")

require('./server/config/express')(app)

require('./server/config/mongoose')('mongodb://localhost/todo');


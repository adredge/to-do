"use strict"

const env = "development"
const config = require('../server/config/config')[env];

require('../server/config/mongoose')(config, env);
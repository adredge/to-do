const bodyParser = require('body-parser')
const routes = require("../../routes")

module.exports = function(app, config) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', routes)

    app.listen(config.port, function () {
    console.log("Listening on port %s...", app.get('port'));
    })
}
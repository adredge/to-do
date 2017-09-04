const routes = require("../../routes")

module.exports = function(app) {
    app.set('port', (process.env.PORT || 3001));

    app.use('/api', routes)

    app.listen(app.get('port'), function () {
    console.log("Listening on port %s...", app.get('port'));
    })
}
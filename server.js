var express = require("express");

var app = express();
app.set('port', (process.env.PORT || 3001));

app.get('/api/list/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('userId: ', userId);
  res.json([{name: "Item One", id: 1, complete: false}, {name: "Item Two", id: 2, complete: false}, {name: "Item Three", id: 3, complete: true}]);
});

app.listen(app.get('port'), function () {
  console.log("Listening on port %s...", app.get('port'));
});

var express = require("express");

var app = express();
app.set('port', (process.env.PORT || 3001));

app.get('/api/lists/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('userId: ', userId);
  res.json([{name: "List One", id: 1}, {name: "List Two", id: 2}, {name: "List Three", id: 3}]);
});

app.listen(app.get('port'), function () {
  console.log("Listening on port %s...", app.get('port'));
});

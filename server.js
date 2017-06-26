var express = require("express");

var app = express();
app.set('port', (process.env.PORT || 3001));

app.get('/api/list', (req, res) => {
  const listName = req.query.id;
  console.log('listName', listName);

  res.json({"hello": "world"});
});

var server = app.listen(app.get('port'), function () {
  console.log("Listening on port %s...", app.get('port'));
});

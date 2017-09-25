var constants = require('./constants');
var express   = require('express'),
  app         = express(),
  port        = process.env.PORT || constants.PORT,
  mongoose    = require('mongoose'),
  User        = require('./api/users/models/userListModel'),
  Task        = require('./api/users/models/taskListModel'),
  bodyParser  = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(constants.CONNECTION_URL);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var userRoutes = require('./api/users/routes/userListRoutes');
userRoutes(app);
var taskRoutes = require('./api/users/routes/taskListRoutes');
taskRoutes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

'use strict';
var mongoose    =  require('mongoose'),
    User        =  mongoose.model('Users');

//Listing all users
exports.list_all_users  =   function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

//Creating a user
exports.create_a_user   =   function(req, res) {
  var new_user          =   new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

//Listing a particular user
exports.read_a_user     =   function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

//Updating a particular user
exports.update_a_user   =   function(req, res) {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

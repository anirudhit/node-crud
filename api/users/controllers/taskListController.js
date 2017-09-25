'use strict';
var moment      =  require('moment');
var mongoose    =  require('mongoose'),
    User        =  mongoose.model('Users'),
    Task        =  mongoose.model('Tasks');

//Method to check the user availability
function checkUserDetails(userId,callback){
  User.findById(userId, function(err, user) {
    if (err){
        callback(false,err);
    }else{
      if(user){
        callback(true,user);
      }else{
        var _exceptionMessage   =   {
          message     : "User not available"
        };
        callback(false,_exceptionMessage);
      }
    }
  });
}

//Creating a user task
//{"name":"My task","description" : "Description of task", "date_time" : "2016-05-25 14:25:00"}'
//http://hostname/api/users/{user_id}/tasks
exports.create_a_user_task   =   function(req, res) {
  var date_time              =   req.body.date_time?moment(req.body.date_time).format():new Date();
  if(req.body.next_execute_date_time){
      var next_execute_date_time =   req.body.next_execute_date_time?moment(req.body.next_execute_date_time).format():new Date();
  }
  var _req      =   {
    name        :   req.body.name,
    description :   req.body.description,
    user_id     :   req.params.user_id,
    date_time   :   date_time,
    next_execute_date_time  :   next_execute_date_time?next_execute_date_time:undefined
  };
  User.findById(req.params.user_id, function(err, user) {
    if (err){
        res.send(err);
    }else{
      if(user){
        var new_task = new Task(_req);
        new_task.save(function(err, task) {
          if (err)
            res.send(err);
          res.json(task);
        });
      }else{
        var _exceptionMessage   =   {
          message     : "User not available"
        };
        res.json(_exceptionMessage);
      }
    }
  });
};

//Displaying a particular user task
//http://hostname/api/users/{user_id}/tasks/{task_id}
exports.read_a_user_task    =   function(req, res) {
  checkUserDetails(req.params.user_id,function(status,responseObj){
    if(status){
      Task.findById(req.params.task_id, function(err, task) {
        if (err){
          res.send(err);
        }else if(task){
          if(req.params.user_id === task.user_id){
            res.json(task);
          }else{
            var _userException  =   {
              "message"         :   "Please check the task details for the user"
            };
            res.json(_userException);
          }
        }else{
          var _userException  =   {
            "message"         :   "Task details are not available"
          };
          res.json(_userException);
        }
      });
    }else{
      res.json(responseObj);
    }
  });
};

//Updating a paticular user task
//http://hostname/api/users/{user_id}/tasks/{task_id}
exports.update_a_user_task    =   function(req, res) {
  checkUserDetails(req.params.user_id,function(status,responseObj){
    if(status){
      Task.findById(req.params.task_id, function(err, task) {
        if (err){
          res.send(err);
        }else if(task){
          if(req.params.user_id === task.user_id){
            Task.findOneAndUpdate({_id: req.params.task_id}, req.body, {new: true}, function(err, task) {
              if (err)
                res.send(err);
              res.json(task);
            });
          }else{
            var _userException  =   {
              "message"         :   "Please check the task details for the user"
            }
            res.json(_userException);
          }
        }else{
          var _userException  =   {
            "message"         :   "Task details are not available"
          };
          res.json(_userException);
        }
      });
    }else{
      res.json(responseObj);
    }
  });
};

//Deleting a particular user task
//http://hostname/api/users/{user_id}/tasks/{task_id}
exports.delete_a_user_task    =   function(req, res) {
  checkUserDetails(req.params.user_id,function(status,responseObj){
    if(status){
      Task.findById(req.params.task_id, function(err, task) {
        if (err){
          res.send(err);
        }else if(task){
          if(req.params.user_id === task.user_id){
            Task.findByIdAndRemove(req.params.task_id, function(err, task) {
              if (err){
                  res.send(err);
              }
              else{
                var _taskSuccessMessage =   {
                  "message"             :   "The task is deleted"
                };
                res.json(_taskSuccessMessage);
              }
            });
          }else{
            var _userException  =   {
              "message"         :   "Please check the task details for the user"
            };
            res.json(_userException);
          }
        }else{
          var _userException  =   {
            "message"         :   "Task details are not available"
          };
          res.json(_userException);
        }
      });
    }else{
      res.json(responseObj);
    }
  });
};

//Listing a particular user tasks
//http://hostname/api/users/{user_id}/tasks
exports.list_all_user_tasks  =   function(req, res) {
  checkUserDetails(req.params.user_id,function(status,responseObj){
    if(status){
      Task.find({user_id: req.params.user_id}, function(err, task) {
        if (err){
          res.send(err);
        }else{
          res.json(task);
        }
      });
    }else{
      res.json(responseObj);
    }
  });
};

var constants = require('./../constants');
var mongoose  = require('mongoose'),
    Task      = require('./../api/users/models/taskListModel'),
    TaskModal =  mongoose.model('Tasks');
var moment    = require('moment');
var Scheduler = require('mongo-scheduler');

var scheduler = new Scheduler(constants.CONNECTION_URL,{pollInterval:1000, doNotFire: false});

var event = {name: 'taskCheck', collection: 'tasks', after: new Date(), data: 'task Details'}
scheduler.schedule(event);

scheduler.on('taskCheck', function(task, event) {
  for(var ind=0; ind < task.length; ind++){
    if(task[ind].next_execute_date_time){
      var nextExecuteDateTimestamp  = moment(task[ind].next_execute_date_time).format('x');
      var todayDateTimestamp        = moment(new Date()).format('x');
      if(todayDateTimestamp > nextExecuteDateTimestamp){
          task[ind].status = 'done';
          console.log(task[ind]);
      }
    }
  }
});

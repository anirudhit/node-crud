'use strict';
var mongoose    =   require('mongoose');
var Schema      =   mongoose.Schema;


var TaskSchema  =   new Schema({
  name          :   {
    type        :    String
  },
  description   :   {
    type        :   String
  },
  user_id       :   {
    type        :   String
  },
  date_time     :   {
    type        :   Date
  },
  next_execute_date_time  :   {
    type        :   Date
  },
  status        :   {
    type        :   String,
    enum        :   ['pending', 'done'],
    default     :   'pending'
  }
});

module.exports  =   mongoose.model('Tasks', TaskSchema);

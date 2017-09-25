'use strict';
var mongoose    =   require('mongoose');
var Schema      =   mongoose.Schema;


var UserSchema  =   new Schema({
  username      :   {
    type        :    String
  },
  first_name    :   {
    type        :   String
  },
  last_name     :   {
    type        :   String
  }
});

module.exports  =   mongoose.model('Users', UserSchema);

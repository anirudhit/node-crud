'use strict';

module.exports    =  function(app) {
  var taskList    =  require('../controllers/taskListController');

  // taskList Routes
  app.route('/api/users/:user_id/tasks')
    .get(taskList.list_all_user_tasks)
    .post(taskList.create_a_user_task);

  app.route('/api/users/:user_id/tasks/:task_id')
    .get(taskList.read_a_user_task)
    .put(taskList.update_a_user_task)
    .delete(taskList.delete_a_user_task);
};

const express = require('express');
 
const authUser = require('../middleware/auth.middleware');
const { addTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskControllers');

const taskRouter = express.Router();

taskRouter.use(authUser);

taskRouter.post('/', addTask);
taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

module.exports = taskRouter;
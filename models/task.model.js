const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ["Work", "Personal", "Shopping", "Other"], default: "Other" }, // Embedded category
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
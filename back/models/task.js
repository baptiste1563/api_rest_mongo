const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, default: false },
  completeFor: { type: Date, default: null },
  assignedTo: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

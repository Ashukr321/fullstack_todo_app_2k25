import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [4, "minimum 4 character"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: [true, "dueDate is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

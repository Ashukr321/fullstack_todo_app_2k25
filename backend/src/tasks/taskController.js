import Task from "./taskModel.js";
import createError from "http-errors";
// Controller to create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    // Validation
    if (!title) {
      // English: Title is required!
      return createError(400, "title is required!")
    }
    if (!description) {
      return createError(400, "description is required !")
    }
    if (!dueDate) {
      return next(createError(400, "dueDate is required!"));
    }

    const userId = await req.userId;
    const newTask = Task.create({
      title: title,
      description: description,
      dueDate: dueDate,
      user: userId
    })

    await newTask.save;
    return res.status(200).json({
      message: "task created successFully!"
    })

  } catch (error) {
    next(error);
  }
};
// Controller to get all tasks for the authenticated user
const getAllTask = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return next(createError(400, "UserId required"));
    }
    // Find all tasks for this user
    const allTasks = await Task.find({ user: userId }).select("-user");
    return res.status(200).json({
      total: allTasks.length,
      message: "All tasks fetched successfully!",
      tasks: allTasks
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get a specific task by ID
const getTaskById = async (req, res, next) => {
  try {
    // Get the task id from request params
    const { id } = req.params;
    if (!id) {
      // Task id is required
      return next(createError(400, "task id is required!"));
    }

    // Find the task by id
    const task = await Task.findById(id);

    if (!task) {
      // Task not found
      return next(createError(404, "Task not found!"));
    }

    return res.status(200).json({
      message: "Task fetched successfully!",
      task: task
    });
  } catch (error) {
    next(error);
  }
};

// Controller to update a specific task by ID
// English: General purpose update controller for task (updates title, description, dueDate, completed)
const updateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    if (!id) {
      return next(createError(400, "task id is required!"));
    }

    const task = await Task.findById(id);

    if (!task) {
      return next(createError(404, "task not found!"));
    }

    // Update fields if provided
    if (typeof title !== "undefined") task.title = title;
    if (typeof description !== "undefined") task.description = description;
    if (typeof dueDate !== "undefined") task.dueDate = dueDate;
    if (typeof completed !== "undefined") task.completed = completed;

    await task.save();

    return res.status(200).json({
      message: "Task updated successfully!",
      task
    });
  } catch (error) {
    next(error);
  }
};

// Controller to delete a specific task by ID
const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return createError(400, "task id required!");
    }
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return createError(400, "task not found");
    }

    return res.status(200).json({
      message: "task deleted successfully!"
    })

  } catch (error) {
    next(error);
  }
};

export { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById };



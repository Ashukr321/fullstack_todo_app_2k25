import Task from "./taskModel.js";
import createError from "http-errors";

// Controller to create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    // Validation
    if (!title) {
      return next(createError(400, "title is required!"));
    }
    if (!description) {
      return next(createError(400, "description is required!"));
    }
    if (!dueDate) {
      return next(createError(400, "dueDate is required!"));
    }

    const userId = req.userId;
    const newTask = new Task({
      title: title,
      description: description,
      dueDate: dueDate,
      user: userId
    });

    await newTask.save();
    return res.status(200).json({
      message: "Task created successfully!"
    });

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
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "task id is required!"));
    }

    const task = await Task.findById(id);

    if (!task) {
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
      return next(createError(400, "task id required!"));
    }
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return next(createError(400, "task not found"));
    }

    return res.status(200).json({
      message: "Task deleted successfully!"
    });

  } catch (error) {
    next(error);
  }
};

// Dashboard task Stats
const taskStats = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return next(createError(400, "UserId required"));
    }

    // Total tasks
    const totalTasks = await Task.countDocuments({ user: userId });

    // Total pending tasks (completed: false)
    const totalPendingTasks = await Task.countDocuments({ user: userId, completed: false });
    // Total completed tasks (completed: true)
    const totalCompletedTasks = await Task.countDocuments({ user: userId, completed: true });

    // Recently added task (latest by createdAt or _id)
    // This code finds the most recently added task for the current user.
    // It searches for a task document where the 'user' field matches the current user's ID.
    // The 'sort' method sorts the results by 'createdAt' in descending order (most recent first).
    // If 'createdAt' is not available, it uses '_id' in descending order as a fallback.
    // The 'select("-user")' part excludes the 'user' field from the returned task object.
    // In summary: This gets the latest task created by the user, without including the user field in the result.


    const recentTask = await Task.findOne({ user: userId })
      .sort({ createdAt: -1, _id: -1 })
      .select("-user");
      

    return res.status(200).json({
      message: "Task stats fetched successfully!",
      totalTasks: totalTasks,
      totalPendingTasks: totalPendingTasks,
      recentTask: recentTask,
      totalCompletedTasks:totalCompletedTasks,
    });
  } catch (error) {
    next(error);
  }
};

export { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById, taskStats };

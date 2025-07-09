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


const taskStats = async (req, res, next) => {
  try {
    // Ensure req.userId is available and valid
    const userId = req.userId;
    if (!userId) {
      return next(createError(400, "userId required"));
    }

    // Count stats
    const totalTasks = await Task.countDocuments({ user: userId });
    const totalPendingTasks = await Task.countDocuments({ user: userId, completed: false });
    const totalCompletedTasks = await Task.countDocuments({ user: userId, completed: true });
    const now = new Date();
    const upcomingHighPriorityTask = await Task.findOne({
      user: userId,
      dueDate: { $gte: now }
    })
      .sort({ dueDate: 1, createdAt: -1 }) // nearest dueDate first
      .select("-user");

    // Find the most recent task
    const recentTask = await Task.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .select("-user");

    return res.status(200).json({
      success: true,
      message: "Task stats fetched successfully!",
      totalTasks,
      totalPendingTasks,
      totalCompletedTasks,
      recentTask,
      upcomingHighPriorityTask
    });

  } catch (error) {
    next(error);
  }
};


const completedTasks = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return next(createError(400, "userId required"));
    }
    const tasks = await Task.find({ user: userId, completed: true }).select("-user");
    return res.status(200).json({
      success: true,
      message: "Completed tasks fetched successfully!",
      tasks
    });
  } catch (error) {
    next(error);
  }
}

export { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById, taskStats, completedTasks };

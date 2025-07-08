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
    // TODO: Implement get all tasks logic here
  } catch (error) {
    next(error);
  }
};

// Controller to get a specific task by ID
const getTaskById = async (req, res, next) => {
  try {
    // TODO: Implement get task by ID logic here
  } catch (error) {
    next(error);
  }
};

// Controller to update a specific task by ID
const updateTaskById = async (req, res, next) => {
  try {
    // TODO: Implement update task by ID logic here
  } catch (error) {
    next(error);
  }
};

// Controller to delete a specific task by ID
const deleteTaskById = async (req, res, next) => {
  try {
    // TODO: Implement delete task by ID logic here
  } catch (error) {
    next(error);
  }
};

export { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById };



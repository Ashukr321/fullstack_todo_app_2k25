import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById,taskStats,completedTasks} from './taskController.js'
const router = express.Router();

// Route to create a new task
router.post("/tasks", isAuthenticated, createTask);

// Route to get all tasks
router.get('/tasks', isAuthenticated, getAllTask);
router.get('/tasks/dashboardStats', isAuthenticated, taskStats);
router.get('/tasks/completedTasks', isAuthenticated, completedTasks);

// Route to get a specific task by IDcompletedTask
router.get('/tasks/:id', isAuthenticated, getTaskById);

// Route to update a specific task by ID
router.put('/tasks/:id', isAuthenticated, updateTaskById); // Note: This should likely call an updateTaskById controller

// Route to delete a specific task by ID
router.delete('/tasks/:id', isAuthenticated, deleteTaskById);

export default router;

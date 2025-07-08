import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById } from './taskController.js'
const router = express.Router();

// Route to create a new task
router.post("/tasks", isAuthenticated, createTask);

// Route to get all tasks
router.get('/tasks', isAuthenticated, getAllTask);

// Route to get a specific task by ID
router.get('/tasks/:id', isAuthenticated, getTaskById);

// Route to update a specific task by ID
router.put('/tasks/:id', isAuthenticated, getTaskById); // Note: This should likely call an updateTaskById controller

// Route to delete a specific task by ID
router.delete('/tasks/:id', isAuthenticated, deleteTaskById);

export default router;

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import getCookies from '../../utils/getCookies.ts'
const cookies = getCookies(["token"]);
const token = cookies.token;

const taskService = {
  // Get all tasks
  async getAllTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },

      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get task by ID
  async getTaskById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Create new task
  async createTask(taskData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1//tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update task
  async updateTask(id, taskData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
  
};


export default taskService;
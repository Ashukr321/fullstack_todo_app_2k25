const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import getCookies from '../../utils/getCookies.ts'

const taskService = {
  // Get all tasks
  async getAllTasks() {
    try {
      const cookies = getCookies(["token"]);
      const token = cookies.token;

      if (!token) {
        // English: No token provided for fetching all tasks.
        // Hindi: सभी टास्क लाने के लिए टोकन नहीं दिया गया है।
        // Hinglish: Sabhi tasks lane ke liye token nahi diya gaya hai.
        throw new Error('No token provided');
      }

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
      const cookies = getCookies(["token"]);
      const token = cookies.token;

      if (!token) {
        // English: No token provided for fetching task by ID.
        // Hindi: टास्क आईडी से लाने के लिए टोकन नहीं दिया गया है।
        // Hinglish: Task ID se lane ke liye token nahi diya gaya hai.
        throw new Error('No token provided');
      }

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
      const cookies = getCookies(["token"]);
      const token = cookies.token;

      if (!token) {
        // English: No token provided for creating task.
        // Hindi: टास्क बनाने के लिए टोकन नहीं दिया गया है।
        // Hinglish: Task banane ke liye token nahi diya gaya hai.
        throw new Error('No token provided');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
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
      const cookies = getCookies(["token"]);
      const token = cookies.token;

      if (!token) {
        // English: No token provided for updating task.
        // Hindi: टास्क अपडेट करने के लिए टोकन नहीं दिया गया है।
        // Hinglish: Task update karne ke liye token nahi diya gaya hai.
        throw new Error('No token provided');
      }

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
      const cookies = getCookies(["token"]);
      const token = cookies.token;

      if (!token) {
        // English: No token provided for deleting task.
        // Hindi: टास्क डिलीट करने के लिए टोकन नहीं दिया गया है।
        // Hinglish: Task delete karne ke liye token nahi diya gaya hai.
        throw new Error('No token provided');
      }

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

  // get dashboard stats 
  async getDashboardStats() {
    try {
      const cookies = getCookies(["token"]);
      const token = cookies.token;

      if (!token) {
        throw new Error('No token provided');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/dashboardStats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("failed to fetch task stats!")
      }

      return await response.json();
    } catch (error) {

      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  async getCompletedTask() {
    try {
      const cookies = getCookies(["token"]);
      const token = cookies.token;
      if (!token) {
        throw new Error('No token provided');
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/completedTasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("failed to fetch task stats!")
      }

      return await response.json();

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
};

export default taskService;
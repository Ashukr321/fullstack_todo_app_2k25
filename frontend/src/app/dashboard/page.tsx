'use client';

import React, { useState, useEffect } from 'react';
import { Task, CreateTaskData } from '@/types/task';
// import { taskService } from '@/services/task/task';
import TaskStats from '@/components/dashboard/TaskStats';
import TaskCard from '@/components/dashboard/TaskCard';
import TaskForm from '@/components/dashboard/TaskForm';
import { FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Dummy data for demonstration
const dummyTasks: Task[] = [
  {
    _id: '1',
    title: 'Complete Project Documentation',
    description: 'Write comprehensive documentation for the new feature implementation including API endpoints and user guides.',
    completed: false,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    user: '64f1a2b3c4d5e6f7a8b9c0d1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '2',
    title: 'Review Code Changes',
    description: 'Review pull requests and provide feedback on code quality and implementation.',
    completed: true,
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    user: '64f1a2b3c4d5e6f7a8b9c0d1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '3',
    title: 'Setup Development Environment',
    description: 'Configure local development environment with all necessary tools and dependencies.',
    completed: false,
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Overdue
    user: '64f1a2b3c4d5e6f7a8b9c0d1',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '4',
    title: 'Implement User Authentication',
    description: 'Create secure user authentication system with JWT tokens and password hashing.',
    completed: false,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    user: '64f1a2b3c4d5e6f7a8b9c0d1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '5',
    title: 'Design Database Schema',
    description: 'Plan and design the database schema for the application with proper relationships.',
    completed: true,
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    user: '64f1a2b3c4d5e6f7a8b9c0d1',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(dummyTasks);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'overdue'>('all');

  // Filter and search tasks
  useEffect(() => {
    let filtered = tasks;

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => {
        if (filterStatus === 'completed') return task.completed;
        if (filterStatus === 'pending') return !task.completed;
        if (filterStatus === 'overdue') {
          const dueDate = typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate;
          return !task.completed && dueDate < new Date();
        }
        return true;
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filterStatus]);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setLoading(true);
      // In a real app, you would call the API here
      // await taskService.deleteTask(id);
      
      // For demo, just remove from local state
      setTasks(prev => prev.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      setLoading(true);
      // In a real app, you would call the API here
      // await taskService.updateTask(id, { completed });
      
      // For demo, just update local state
      setTasks(prev => prev.map(task => 
        task._id === id ? { ...task, completed } : task
      ));
      toast.success(`Task ${completed ? 'completed' : 'marked as pending'}`);
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTask = async (taskData: CreateTaskData) => {
    try {
      setLoading(true);
      
      if (editingTask) {
        // Update existing task
        // In a real app, you would call the API here
        // const updatedTask = await taskService.updateTask(editingTask._id!, taskData);
        
        // For demo, just update local state
        const updatedTask = {
          ...editingTask,
          ...taskData,
          updatedAt: new Date(),
        };
        
        setTasks(prev => prev.map(task => 
          task._id === editingTask._id ? updatedTask : task
        ));
        toast.success('Task updated successfully');
      } else {
        // Create new task
        // In a real app, you would call the API here
        // const newTask = await taskService.createTask(taskData);
        
        // For demo, just add to local state
        const newTask: Task = {
          _id: Date.now().toString(),
          ...taskData,
          completed: taskData.completed || false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setTasks(prev => [newTask, ...prev]);
        toast.success('Task created successfully');
      }
      
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      toast.error(editingTask ? 'Failed to update task' : 'Failed to create task');
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    // In a real app, you would fetch fresh data from the API
    toast.success('Data refreshed');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
          <p className="text-gray-600">Manage your tasks and track your progress</p>
        </div>

        {/* Stats Section */}
        <TaskStats tasks={tasks} onAddTask={handleAddTask} />

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-400" size={20} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending' | 'overdue')}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Refresh data"
              >
                <FiRefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FiSearch size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first task'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Your First Task
                </button>
              )}
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmitTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

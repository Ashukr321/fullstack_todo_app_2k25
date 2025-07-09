'use client';

import React from 'react';
import { Task } from '@/types/task';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiPlus } from 'react-icons/fi';

interface TaskStatsProps {
  tasks: Task[];
  onAddTask: () => void;
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks, onAddTask }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  const overdueTasks = tasks.filter(task => {
    if (task.completed) return false;
    const dueDate = typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate;
    return dueDate < new Date();
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Task Overview</h2>
        <button
          onClick={onAddTask}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" size={16} />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiPlus className="text-blue-600" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-800">{totalTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheckCircle className="text-green-600" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-800">{completedTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FiClock className="text-yellow-600" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-800">{pendingTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiAlertTriangle className="text-red-600" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-600">Overdue</p>
              <p className="text-2xl font-bold text-red-800">{overdueTasks}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Completion Rate</span>
          <span className="text-sm font-medium text-gray-700">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats; 
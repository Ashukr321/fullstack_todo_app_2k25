'use client';

import React, { useState } from 'react';
import { Task } from '@/types/task';
import { FiEdit2, FiTrash2, FiCalendar, FiCheck, FiX } from 'react-icons/fi';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = () => {
    const dueDate = typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate;
    return !task.completed && dueDate < new Date();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task._id!);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      task.completed 
        ? 'border-green-500 bg-green-50' 
        : isOverdue() 
        ? 'border-red-500 bg-red-50' 
        : 'border-blue-500'
    } transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          <p className={`text-gray-600 mb-3 ${
            task.completed ? 'line-through' : ''
          }`}>
            {task.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FiCalendar className="mr-2" />
            <span className={isOverdue() && !task.completed ? 'text-red-600 font-medium' : ''}>
              Due: {formatDate(task.dueDate)}
              {isOverdue() && !task.completed && ' (Overdue)'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onToggleComplete(task._id!, !task.completed)}
            className={`p-2 rounded-full transition-colors ${
              task.completed 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? <FiCheck size={16} /> : <FiX size={16} />}
          </button>
          
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            title="Edit task"
          >
            <FiEdit2 size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
            title="Delete task"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          task.completed 
            ? 'bg-green-100 text-green-800' 
            : isOverdue() 
            ? 'bg-red-100 text-red-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {task.completed ? 'Completed' : isOverdue() ? 'Overdue' : 'Pending'}
        </span>
        
        {task.createdAt && (
          <span className="text-xs text-gray-400">
            Created: {formatDate(task.createdAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard; 
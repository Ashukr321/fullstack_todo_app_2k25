"use client";
import React, { useEffect, useState } from "react";
import taskService from "../../../services/task/task";
import toast from "react-hot-toast";
import { Task } from "../../../types/task";
import Loader from "@/components/common/Loader";
import TaskCard from "@/components/dashboard/TaskCard";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Page = () => {
  // Create state for tasks with proper typing
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Destructure taskService methods
  const { getAllTasks, deleteTask, updateTask } = taskService;
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      setIsRefreshing(true);
      const data = await getAllTasks();
      if (data) {
        toast.success(data.message);
        console.log(data);
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]); // Set to empty array on error to avoid infinite loader
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch all tasks on component mount
    fetchTasks();
  }, [getAllTasks]);

  // Handle task deletion
  const handleDelete = async (taskId: string) => {
    try {
      const response = await deleteTask(taskId);
      if (response) {
        toast.success(response.message);
        // Refresh the tasks list
        const updatedTasks = tasks?.filter(task => task._id !== taskId) || [];
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    }
  };

  // Handle task completion toggle
  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      const response = await updateTask(taskId, { completed });
      if (response) {
        toast.success(response.message || "Task updated successfully");
        // Update the task in the local state
        setTasks(prevTasks => 
          prevTasks?.map(task => 
            task._id === taskId 
              ? { ...task, completed } 
              : task
          ) || []
        );
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    }
  };

  const completedTasks = tasks?.filter(task => task.completed) || [];
  const pendingTasks = tasks?.filter(task => !task.completed) || [];

  if (tasks === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white   shadow-sm border-b border-gray-200">
        <div className="w-full   py-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="ml-4 flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tasks.length} Total
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {completedTasks.length} Completed
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {pendingTasks.length} Pending
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchTasks}
                disabled={isRefreshing}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => router.push('/dashboard/createtask')}
                className="inline-flex items-center mr-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tasks.length > 0 ? (
          <div className="space-y-6">
            {/* Pending Tasks Section */}
            {pendingTasks.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                    Pending Tasks ({pendingTasks.length})
                  </h2>
                </div>
                <div className="grid gap-4">
                  {pendingTasks.map((task) => (
                    <TaskCard 
                      key={task._id} 
                      task={task}
                      onDelete={handleDelete}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    Completed Tasks ({completedTasks.length})
                  </h2>
                </div>
                <div className="grid gap-4">
                  {completedTasks.map((task) => (
                    <TaskCard 
                      key={task._id} 
                      task={task}
                      onDelete={handleDelete}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first task.</p>
            <button
              onClick={() => router.push('/dashboard/createtask')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Create Your First Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

"use client";
import React, { useState } from "react";
import { CreateTaskData } from "../../../types/task";
import toast from "react-hot-toast";
import taskService from "@/services/task/task";
import { FiLoader, FiPlusCircle } from "react-icons/fi";



const Page = () => {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    completed: false,
    dueDate: "",
  });

  const [isCreating, setCreating] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      // Here you would call your task service to create the task
      const { createTask } = taskService;
      const resData = await createTask(formData);
      if (resData) {
        toast.success(
          resData.message ||
            "Task created successfully!"
        );
      }
      setCreating(false);
      // Reset form
      setFormData({
        title: "",
        description: "",
        completed: false,
        dueDate: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(
        "Failed to create task"
      );
      setCreating(false);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center md:py-8  md:px-2">
      <div className="w-full bg-white rounded-2xl shadow-2xl sm:p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-3">
            <FiPlusCircle size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-1">
            Create New Task
          </h1>
          <p className="text-gray-500 text-center text-sm">
            Add a new task to your list and stay productive!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter task title"
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter task description"
            />
          </div>

          {/* Due Date Field */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Completed Status Field */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="completed"
              className="ml-2 block text-sm text-gray-900"
            >
              Mark as completed
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-semibold text-lg shadow-md"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <FiLoader className="animate-spin" size={22} />
                  Creating...
                </>
              ) : (
                <>
                  <FiPlusCircle size={22} />
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

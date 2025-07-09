"use client";
import React, { useEffect, useState } from "react";
import taskService from "@/services/task/task";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import { Task } from "@/types/task";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiLoader } from "react-icons/fi";

const Page = () => {
  const { taskId } = useParams() as { taskId: string };
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const router = useRouter();

  const fetchTask = async (taskId: string) => {
      setLoading(true);
    const { getTaskById } = taskService;
    const resData = await getTaskById(taskId);
    if (resData) {
      setTask(resData.task);
      toast.success(resData.message);
    }
        setLoading(false);
  };

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
    // eslint-disable-next-line
  }, [taskId]);

  useEffect(() => {
    if (task) {
      setEditForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
        completed: task.completed,
      });
    }
  }, [task]);

  // Delete handler
  const handleDelete = async () => {
    if (!task) return;
    setIsProcessing(true);
    try {
      const { deleteTask } = taskService;
      const res = await deleteTask(task._id!);
      if (res) {
        toast.success(res.message || "Task deleted successfully");
        setShowDeleteModal(false);
        router.push("/dashboard/alltask");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Failed to delete task");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle complete handler
  const handleToggleComplete = async () => {
    if (!task) return;
    setIsProcessing(true);
    try {
      const { updateTask } = taskService;
      const res = await updateTask(task._id!, { completed: !task.completed });
      if (res) {
        toast.success(res.message || "Task updated");
        setTask({ ...task, completed: !task.completed });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Failed to update task");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Edit handler (navigate to edit page)
  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    setIsProcessing(true);
    try {
      const { updateTask } = taskService;
      const res = await updateTask(task._id!, {
        ...editForm,
        dueDate: editForm.dueDate,
      });

      if (res) {
        toast.success(res.message || "Task updated");
        setTask({ ...task, ...editForm });
        setShowEditModal(false);
    }
    } catch (err) {
      if(err instanceof Error){
        toast.error("Failed to update task");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold text-gray-700 mb-2">No task found</h2>
        <p className="text-gray-500">
          The task you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex cursor-pointer items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Tasks
          </button>
        </div>

        {/* Main Task Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Task Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 gap-x-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 break-words">
                  {task.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  {task.completed ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Pending
                    </span>
                  )}
                  <span className="text-blue-100 text-xs sm:text-sm break-words">
                    Due:{" "}
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Task Content */}
          <div className="px-8 py-6">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {task.description || "No description provided"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleEdit}
                className="inline-flex cursor-pointer items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                disabled={isProcessing}
              >
                <FiEdit2 className="w-4 h-4 mr-2" />
                Edit Task
              </button>

              <button
                onClick={handleToggleComplete}
                className={`inline-flex cursor-pointer items-center px-6 py-3 font-medium rounded-lg transition-colors shadow-md hover:shadow-lg ${
                  task.completed
                    ? "bg-gray-600 text-white hover:bg-gray-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                disabled={isProcessing}
              >
                {task.completed ? (
                  <>
                    <FiX className="w-4 h-4 mr-2" />
                    Mark Incomplete
                  </>
                ) : (
                  <>
                    <FiCheck className="w-4 h-4 mr-2" />
                    Mark Complete
                  </>
                )}
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex cursor-pointer items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                disabled={isProcessing}
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>

            {/* Created Date */}
            {task.createdAt && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Created on{" "}
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FiTrash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Task
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete &ldquo;{task.title}&rdquo;? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isProcessing}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center font-medium"
              >
                {isProcessing ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={16} />
                    Deleting...
                  </>
                ) : (
                  "Delete Task"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Edit Task</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  id="edit-title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
    <div>
                <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  id="edit-dueDate"
                  name="dueDate"
                  type="datetime-local"
                  value={editForm.dueDate}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="edit-completed"
                  name="completed"
                  type="checkbox"
                  checked={editForm.completed}
                  onChange={handleEditInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="edit-completed" className="ml-2 block text-sm text-gray-900">
                  Mark as completed
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

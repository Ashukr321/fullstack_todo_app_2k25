"use client";

import React, { useState } from "react";
import { Task } from "@/types/task";
import {
  FiTrash2,
  FiCalendar,
  FiCheck,
  FiX,
  FiLoader,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FiEye } from "react-icons/fi";
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onToggleComplete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      onDelete(task._id!);
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const taskDetailsHandler = (id: string) => {
    router.push(`/dashboard/alltask/${id}`);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md mt-2 p-6 border-l-4 ${
          task.completed ? "border-green-500 bg-green-50" : "border-blue-500"
        } transition-all duration-200 hover:shadow-lg`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold mb-2 ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            <p
              className={`text-gray-600 mb-3 ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.description}
            </p>

            <div className="flex items-center text-sm text-gray-500 mb-3">
              <FiCalendar className="mr-2" />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => task._id && taskDetailsHandler(task._id)}
              className="p-2 cursor-pointer text-purple-700 hover:bg-purple-100 rounded-lg transition-all font-bold "
              title="View details task"
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={() => onToggleComplete(task._id!, !task.completed)}
              className={`p-2 cursor-pointer rounded-full transition-colors ${
                task.completed
                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed ? <FiCheck size={16} /> : <FiX size={16} />}
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="p-2 text-red-600 cursor-pointer hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
              title="Delete task"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              task.completed
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>

          {task.createdAt && (
            <span className="text-xs text-gray-400">
              Created: {formatDate(task.createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Task
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &ldquo;{task.title}&rdquo;? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isDeleting ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={16} />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;

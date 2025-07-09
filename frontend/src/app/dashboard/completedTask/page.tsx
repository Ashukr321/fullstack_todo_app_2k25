"use client";
import React, { useEffect, useState } from "react";
import taskService from "@/services/task/task";
import Loader from "@/components/common/Loader";
import { FiCheckCircle, FiCalendar } from "react-icons/fi";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      setLoading(true);
      const { getCompletedTask } = taskService;
      const res = await getCompletedTask();
      if (res?.tasks) setTasks(res.tasks);
      setLoading(false);
    };
    fetchCompletedTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-2">
      <div className=" w-full mx-auto">
        {tasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-500 text-lg">No completed tasks found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tasks.map(task => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 border-l-4 border-green-500 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FiCheckCircle className="text-green-600" size={22} />
                  <h2 className="text-lg font-bold text-green-700 break-words">
                    {task.title}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mb-2 break-words">
                  {task.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiCalendar />
                  {new Date(task.dueDate).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

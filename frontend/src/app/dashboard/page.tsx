"use client";
import React, { useEffect, useState } from "react";
import taskService from "@/services/task/task";
import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiClock,
  FiList,
  FiStar,
  FiChevronRight,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";
import Loader from "@/components/common/Loader";

// Types

type TaskSummary = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

type DashboardStats = {
  totalTasks: number;
  totalCompletedTasks: number;
  totalPendingTasks: number;
  recentTask?: TaskSummary;
  upcomingHighPriorityTask?: TaskSummary;
  message?: string;
};

const Page = () => {
  const { getDashboardStats } = taskService;
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const res = await getDashboardStats();
      setStats(res);
      if (res?.message) toast.success(res.message);
      setLoading(false);
    };
    fetchStats();
  }, [getDashboardStats]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid - Responsive: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center border-t-4 border-blue-500 hover:shadow-2xl transition-shadow">
            <FiList className="text-blue-500 mb-2" size={28} />
            <span className="text-3xl font-extrabold text-blue-600">
              {stats?.totalTasks ?? "--"}
            </span>
            <span className="mt-1 text-gray-600 font-medium text-sm">
              Total Tasks
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center border-t-4 border-green-500 hover:shadow-2xl transition-shadow">
            <FiCheckCircle className="text-green-500 mb-2" size={28} />
            <span className="text-3xl font-extrabold text-green-600">
              {stats?.totalCompletedTasks ?? "--"}
            </span>
            <span className="mt-1 text-gray-600 font-medium text-sm">
              Completed
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center border-t-4 border-yellow-400 hover:shadow-2xl transition-shadow">
            <FiClock className="text-yellow-400 mb-2" size={28} />
            <span className="text-3xl font-extrabold text-yellow-500">
              {stats?.totalPendingTasks ?? "--"}
            </span>
            <span className="mt-1 text-gray-600 font-medium text-sm">
              Pending
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center border-t-4 border-indigo-500 hover:shadow-2xl transition-shadow">
            <FiStar className="text-indigo-500 mb-2" size={28} />
            <span className="text-3xl font-extrabold text-indigo-600">
              {stats?.recentTask?.title ? "1" : "0"}
            </span>
            <span className="mt-1 text-gray-600 font-medium text-sm">
              Recent Task
            </span>
          </div>
        </div>

        {/* Recent and Upcoming Task Cards Grid */}
        {(stats?.recentTask || stats?.upcomingHighPriorityTask) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Recent Task Card */}
            {stats?.recentTask && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiChevronRight className="text-blue-600" /> Recent Added
                </h2>
                <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 border-l-4 border-blue-500 hover:shadow-2xl transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-blue-700 mb-1 flex items-center gap-2">
                      <FiList className="text-blue-400" />{" "}
                      {stats.recentTask.title}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      {stats.recentTask.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                      <span
                        className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                          stats.recentTask.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {stats.recentTask.completed ? (
                          <>
                            <FiCheckCircle /> Completed
                          </>
                        ) : (
                          <>
                            <FiAlertCircle /> Pending
                          </>
                        )}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <FiCalendar />
                        Due:{" "}
                        {new Date(stats.recentTask.dueDate).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Upcoming High Priority Task Card */}
            {stats?.upcomingHighPriorityTask && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiChevronRight className="text-indigo-600" /> Upcoming High
                  Priority Task
                </h2>
                <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 border-l-4 border-indigo-500 hover:shadow-2xl transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-indigo-700 mb-1 flex items-center gap-2">
                      <FiStar className="text-indigo-400" />{" "}
                      {stats.upcomingHighPriorityTask.title}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      {stats.upcomingHighPriorityTask.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                      <span
                        className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                          stats.upcomingHighPriorityTask.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {stats.upcomingHighPriorityTask.completed ? (
                          <>
                            <FiCheckCircle /> Completed
                          </>
                        ) : (
                          <>
                            <FiAlertCircle /> Pending
                          </>
                        )}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <FiCalendar />
                        Due:{" "}
                        {new Date(
                          stats.upcomingHighPriorityTask.dueDate
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

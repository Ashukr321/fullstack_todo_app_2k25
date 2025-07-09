"use client";
import React, { useEffect } from "react";
import taskService from "@/services/task/task";
import toast from "react-hot-toast";

const Page = () => {
  const { getDashboardStats } = taskService;

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getDashboardStats();
      console.log(res);
      if (res?.message) toast.success(res.message);
    };
    fetchStats();
  }, [getDashboardStats]);

  return (
    <div className="p-2 py-4">
      <h1>dashboard</h1>
      {/* You can use stats here */}
    </div>
  );
};

export default Page;

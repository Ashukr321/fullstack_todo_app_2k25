import React from "react";
import Link from "next/link";
import { MdDashboard, MdAddTask, MdCheckCircle, MdList } from "react-icons/md";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <span className="mr-3 text-blue-500">
        <MdDashboard size={20} />
      </span>
    ), // Dashboard icon
  },
  {
    label: "All Tasks",
    href: "/dashboard/alltask",
    icon: (
      <span className="mr-3 text-purple-500">
        <MdList size={20} />
      </span>
    ), // List icon
  },

  {
    label: "Create Task",
    href: "/dashboard/createtask",
    icon: (
      <span className="mr-3 text-green-500">
        <MdAddTask size={20} />
      </span>
    ), // Add Task icon
  },
  {
    label: "Completed Task",
    href: "/dashboard/completedTask",
    icon: (
      <span className="mr-3 text-yellow-500">
        <MdCheckCircle size={20} />
      </span>
    ), // Completed/Check icon
  },
];

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-white border-r border-blue-100 min-h-screen py-10 px-4 flex flex-col">
      <nav className="flex-1 space-y-2">
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

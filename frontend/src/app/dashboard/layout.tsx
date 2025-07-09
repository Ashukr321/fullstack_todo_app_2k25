"use client"
import React, { ReactNode, useState } from 'react';
import Header from '../../components/dashboard/Header';
import Sidebar from '../../components/dashboard/Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen  bg-blue-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
      </div>
      <div className="flex pt-[64px] h-screen">
        {/* Fixed Sidebar for desktop */}
        <div className="hidden md:block fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 z-40">
          <Sidebar />
        </div>
        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64 bg-white border-r border-blue-100 min-h-screen shadow-lg">
              <Sidebar />
            </div>
            <div
              className="flex-1 bg-black/60 bg-opacity-30"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}
        {/* Main Content */}
        <main
          className="flex-1 overflow-y-auto md:ml-64 w-full scrollbar-hide"
          style={{
            maxHeight: 'calc(100vh - 60px)',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

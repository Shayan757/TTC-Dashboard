'use client'
import { useState } from 'react';
import Navbar from "../../components/layout/Navbar";
import Sidebar from '../../components/Dashboard/Sidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="max-h-screen h-full flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-grow flex flex-col w-full">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <main style={{height:'100%'}} className="flex-grow overflow-y-scroll bg-gray-100 p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

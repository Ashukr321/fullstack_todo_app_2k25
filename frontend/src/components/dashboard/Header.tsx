"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import getCookies from "@/utils/getCookies";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  // Get userInfo from cookies and parse it safely
  const cookies = getCookies(["userInfo"]);

  // Decode URI component and parse JSON safely
  const userInfo = useMemo(() => {
    if (cookies.userInfo) {
      try {
        // First decodeURIComponent, then parse
        const decoded = decodeURIComponent(cookies.userInfo);
        return JSON.parse(decoded);
      } catch (error) {
        console.error("Failed to decode or parse userInfo cookie:", error);
        return null;
      }
    }
    return null;
  }, [cookies.userInfo]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const logoutHandler = async () => {
    // Clear all cookies
    document.cookie.split(";").forEach(c => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-white border-b border-blue-100 shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left: Hamburger on mobile, title on desktop */}
      <div className="flex items-center">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden mr-2 p-2 rounded focus:outline-none hover:bg-blue-50"
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          <svg
            className="w-6 h-6 text-blue-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Title only on desktop */}
        <span className="hidden md:block text-xl md:text-2xl font-bold text-blue-700">
          TaskSprint
        </span>
      </div>
      {/* Right: Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(v => !v)}
          className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-blue-50 focus:outline-none transition-colors"
        >
          <span className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-2xl select-none">
            👤
          </span>
          <span className="hidden sm:block font-medium text-gray-700">
            {userInfo && userInfo.name ? userInfo.name : "User"}
          </span>
          <svg
            className="w-4 h-4 ml-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white  shadow-lg z-10 animate-fade-in">
            <button
              onClick={logoutHandler}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-blue-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



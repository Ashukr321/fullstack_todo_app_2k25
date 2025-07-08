"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menu/dropdown on outside click (mobile only)
  useEffect(() => {
    if (!menuOpen && !dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !(dropdownRef.current && dropdownRef.current.contains(target))
      ) {
        setMenuOpen(false);
        setDropdownOpen(false);
      } else if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen, dropdownOpen]);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / App Name */}
          <div className="flex-shrink-0 flex items-center text-2xl font-bold text-blue-600">
            TodoApp
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8">
            {MENU_ITEMS.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Dropdown */}
          {/* 
            English: Simple Login and Signup links for proper navigation.
            Hindi: Sahi navigation ke liye seedhe Login aur Signup links.
            Hinglish: Sahi tarike se link chalane ke liye simple Login/Signup links.
          */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none"
            >
              Signup
            </Link>
          </div>

          {/* Hamburger for Mobile */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-white hover:bg-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-black/60 bg-opacity-30`}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`w-64 bg-white h-full shadow-lg transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="px-2 pt-4 pb-3 space-y-1">
            {MENU_ITEMS.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* 
              English: Use Next.js <Link> for navigation so links work correctly.
              Hindi: Next.js <Link> ka istemal kare taki links sahi se kaam karein.
              Hinglish: Next.js <Link> use karo, tabhi links sahi chalenge.
            */}
            <div className="mt-2 border-t pt-2" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className="w-full flex items-center justify-between px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                type="button"
              >
                Login / Signup
                <svg
                  className="ml-2 w-4 h-4"
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
                <div className="mt-2 w-full bg-white border rounded-md shadow-lg z-10 animate-fade-in">
                  {/* English: Use Next.js Link for navigation */}
                  {/* Hindi: Navigation ke liye Next.js Link ka use karein */}
                  {/* Hinglish: Navigation ke liye Next.js Link lagao */}
                  <Link href="/login" passHref legacyBehavior>
                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Login
                    </a>
                  </Link>
                  <Link href="/register" passHref legacyBehavior>
                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Signup
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const MENU_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#feature" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click (mobile only)
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-md bg-gradient-to-r from-[#18181b]/80 via-[#232329]/80 to-[#18181b]/80 border-b border-white/10 shadow-lg px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
            T
          </span>
          <span className="text-white font-bold text-xl tracking-wide">
            TaskSprint

          </span>
        </div>

        {/* Nav Links (centered on desktop) */}
        <ul className="hidden md:flex gap-8 mx-auto">
          {MENU_ITEMS.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-gray-200 hover:text-white font-medium transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons / CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Ashukr321/fullstack_todo_app_2k25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition">
            <FiGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashukr321/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-300 transition"
          >
            <FiLinkedin size={20} />
          </a>
          <Link
            href="/login"
            className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger for Mobile */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="inline-flex items-center justify-center p-2 rounded-md text-blue-300 hover:text-white hover:bg-blue-600 focus:outline-none"
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
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-black/60 bg-opacity-30`}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`w-64 bg-[#18181b] h-full shadow-lg transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="px-2 pt-4 pb-3 space-y-1">
            {MENU_ITEMS.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/Ashukr321/fullstack_todo_app_2k25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ashukr321/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-300 transition"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
            <Link
              href="/login"
              className="mt-4 block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

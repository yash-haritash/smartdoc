import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const stored = localStorage.getItem('smartdoc-username');
    if (stored) setUserName(stored);
  }, []);
  const handleThemeToggle = () => {
    setDarkMode((prev) => {
      localStorage.setItem('smartdoc-darkMode', JSON.stringify(!prev));
      return !prev;
    });
  };
  return (
    <nav className={`w-full flex items-center justify-between px-6 py-3 shadow-md ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} sticky top-0 z-50 transition-colors`}>
      <div className="flex items-center gap-3">
        <Link to="/" className="text-2xl font-bold text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all">🧠 SmartDoc AI</Link>
      </div>
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `text-base font-medium px-3 py-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ` +
            (isActive
              ? darkMode ? 'text-blue-400' : 'text-blue-600'
              : darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600')
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-base font-medium px-3 py-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ` +
            (isActive
              ? darkMode ? 'text-blue-400' : 'text-blue-600'
              : darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600')
          }
        >
          About
        </NavLink>
        {userName && (
          <span className="ml-4 text-base font-semibold text-blue-700 dark:text-blue-300">Hi {userName}</span>
        )}
        <button
          className={`ml-6 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
          onClick={handleThemeToggle}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

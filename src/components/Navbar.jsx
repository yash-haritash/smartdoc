import React from 'react';
import { useTheme } from './ThemeContext';

export default function Navbar({ onAbout, activePage }) {
  const { darkMode, setDarkMode } = useTheme();
  const handleThemeToggle = () => {
    setDarkMode((prev) => {
      localStorage.setItem('smartdoc-darkMode', JSON.stringify(!prev));
      return !prev;
    });
  };
  return (
    <nav className={`w-full flex items-center justify-between px-6 py-3 shadow-md ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} sticky top-0 z-50 transition-colors`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-blue-600">🧠 SmartDoc AI</span>
      </div>
      <div className="flex items-center gap-6">
        <button
          className={`text-base font-medium px-2 py-1 rounded transition-colors ${activePage === 'home' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : (darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600')}`}
          onClick={() => onAbout(false)}
        >
          Home
        </button>
        <button
          className={`text-base font-medium px-2 py-1 rounded transition-colors ${activePage === 'about' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : (darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600')}`}
          onClick={() => onAbout(true)}
        >
          About
        </button>
        <button
          className={`ml-6 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors text-xl focus:outline-none`}
          onClick={handleThemeToggle}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

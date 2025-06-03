import React from 'react';
import { useTheme } from './ThemeContext';

export default function Footer() {
  const { darkMode } = useTheme();
  return (
    <footer className={`w-full text-center py-4 text-sm font-medium ${darkMode ? 'bg-gray-900 text-gray-400 border-t border-gray-800' : 'bg-gray-50 text-gray-500 border-t border-gray-200'} transition-colors`}>
      Designed by Yash Haritash
    </footer>
  );
}

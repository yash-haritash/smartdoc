import React from 'react';
import { useTheme } from './ThemeContext';

export default function SummaryOutput({ summary }) {
  const { darkMode } = useTheme();
  return (
    <div className={`mt-6 ${darkMode ? 'custom-dark' : 'custom-light'}`}>
      <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Summary:</h2>
      <p className={`p-4 rounded-md ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>{summary}</p>
    </div>
  );
}

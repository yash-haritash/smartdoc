import React from 'react';
import { useTheme } from './ThemeContext';

export default function TextInput({ inputText, setInputText }) {
  const { darkMode } = useTheme();

  return (
    <textarea
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      rows={10}
      placeholder="Paste your text here..."
      className={`w-full p-4 border rounded-md transition-colors ${
        darkMode
          ? 'bg-gray-800 text-gray-100 border-gray-700'
          : 'bg-white text-gray-900 border-gray-300'
      }`}
    />
  );
}

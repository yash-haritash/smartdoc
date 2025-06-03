import React from 'react';
import { useTheme } from './ThemeContext';

export default function AboutPage() {
  const { darkMode } = useTheme();
  return (
    <div className={`max-w-2xl mx-auto mt-12 p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900 text-gray-100 border border-gray-800' : 'bg-white text-gray-800 border border-gray-200'} transition-colors`}>
      <h2 className="text-3xl font-bold mb-4 text-blue-600">About SmartDoc AI</h2>
      <p className="mb-4 text-lg leading-relaxed">
        <b>SmartDoc AI</b> is a modern, AI-powered document summarizer and keyword extractor. Paste your text, get a concise summary, and see the most important keywords instantly. Built with React, Tailwind CSS, and Hugging Face AI.
      </p>
      <ul className="list-disc ml-6 text-base mb-4">
        <li>Summarize long documents in one click</li>
        <li>Extract top keywords for quick insights</li>
        <li>Switch between beautiful dark and light themes</li>
        <li>Persistent chat history and modern UI</li>
      </ul>
      <p className="text-base">Designed and developed by <span className="font-semibold text-blue-500">Yash</span>.</p>
    </div>
  );
}

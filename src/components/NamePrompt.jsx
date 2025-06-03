import React, { useState } from 'react';

export default function NamePrompt({ onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    localStorage.setItem('smartdoc-username', name.trim());
    onSubmit(name.trim());
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 flex flex-col gap-4 min-w-[320px]">
        <label className="text-lg font-semibold text-gray-800 dark:text-gray-100">Welcome! What's your name?</label>
        <input
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
          autoFocus
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors">Continue</button>
      </form>
    </div>
  );
}

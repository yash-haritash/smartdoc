import React from 'react';
import { useTheme } from './ThemeContext';

export default function HistoryPanel({
  history,
  historyOpen,
  setHistoryOpen,
  handleHistoryClick,
  handleDeleteHistory,
  setInputText,
  setSummary,
  setError
}) {
  const { darkMode } = useTheme();

  return (
    <aside className={`transition-all duration-300 ${historyOpen ? 'w-72' : 'w-12'} border-r pr-0 flex flex-col bg-gray-50 dark:bg-gray-900 rounded-l-lg shadow-lg overflow-hidden`}>
      <div
  className={
    "flex items-center justify-between px-3 py-2 border-b " +
    (darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-600")
  }
>

        {historyOpen && <h2 className='text-white text-lg'>History</h2>}
        <button
          className={`ml-auto ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
          onClick={() => setHistoryOpen(open => !open)}
          title={historyOpen ? 'Collapse' : 'Expand'}
        >
          {historyOpen ? <span>&#x25C0;</span> : <span>&#x25B6;</span>}
        </button>
      </div>
      {historyOpen && (
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 items-center">
          <button
            className="mb-3 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            onClick={() => {
              setInputText('');
              setSummary('');
              setError('');
            }}
          >
            + New Chat
          </button>
          {history.length === 0 && <div className="text-gray-300 text-center">No history yet.</div>}
          <ul className="space-y-3 w-full flex flex-col items-center">
            {history.map(item => (
              <li key={item.id} className={`p-2 flex flex-col gap-1 border w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}> 
                <div className="truncate text-xs cursor-pointer hover:underline text-white" onClick={() => handleHistoryClick(item)} title={item.input}>{item.summary}</div>
                <button className="self-end text-xs text-red-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400" onClick={() => handleDeleteHistory(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

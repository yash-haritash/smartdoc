import React from 'react';
import TextInput from './TextInput';
import SummaryOutput from './SummaryOutput';
import KeywordList from './KeywordList';
import HistoryPanel from './HistoryPanel';

export default function Home({
  inputText,
  setInputText,
  summary,
  setSummary,
  loading,
  error,
  handleSummarize,
  history,
  historyOpen,
  setHistoryOpen,
  handleHistoryClick,
  handleDeleteHistory,
  setError
}) {
  return (
    <>
      {/* Collapsible History Sidebar */}
      <aside className={`h-full sticky top-[56px] flex-shrink-0 w-72 ${historyOpen ? 'md:flex' : 'hidden'} flex-col border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-colors z-10 rounded-none shadow-none`}>
        <div className="flex-1 overflow-auto">
          <HistoryPanel
            history={history}
            historyOpen={historyOpen}
            setHistoryOpen={setHistoryOpen}
            handleHistoryClick={handleHistoryClick}
            handleDeleteHistory={handleDeleteHistory}
            setInputText={setInputText}
            setSummary={setSummary}
            setError={setError}
          />
        </div>
      </aside>
      {/* Sidebar Toggle Button - always visible, vertically centered, outside the sidebar */}
      <button
        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-r-none shadow-none transition-colors focus:outline-none"
        style={{ display: historyOpen ? 'none' : 'flex' }}
        onClick={() => setHistoryOpen(true)}
        aria-label="Open history sidebar"
      >
        <span className="text-xl">▶</span>
      </button>
      <main className="relative flex-1 flex flex-col items-center justify-center transition-colors h-full rounded-none shadow-none border-0 overflow-auto pt-20">
        <div className="w-full max-w-2xl flex flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-14">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-400 drop-shadow-sm tracking-tight">SmartDoc AI</h1>
          </header>
          <TextInput inputText={inputText} setInputText={setInputText} />
          <button
            onClick={handleSummarize}
            disabled={!inputText || loading}
            className="mt-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 shadow-none text-lg font-bold tracking-wide transition-all duration-200"
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-200 rounded-lg border border-red-300 dark:border-red-700 font-medium shadow-none">
              {error}
            </div>
          )}
          {summary && !error && (
            <>
              <SummaryOutput summary={summary} />
              <KeywordList text={inputText} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

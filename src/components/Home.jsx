import React, { useState } from 'react';
import TextInput from './TextInput';
import SummaryOutput from './SummaryOutput';
import KeywordList from './KeywordList';
import HistoryPanel from './HistoryPanel';
import ThinkingIcon from './ThinkingIcon';
import { answerQuestion } from '../utils/qaAPI';
import { useTheme } from './ThemeContext';

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
  // Add state for QA
  const [question, setQuestion] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [qaAnswer, setQaAnswer] = useState('');
  const [qaError, setQaError] = useState('');
  const { darkMode } = useTheme();

  const handleAsk = async () => {
    setQaLoading(true);
    setQaError('');
    setQaAnswer('');
    try {
      const answer = await answerQuestion(inputText, question);
      if (answer.startsWith('Error:')) {
        setQaError(answer);
      } else {
        setQaAnswer(answer);
      }
    } catch (e) {
      setQaError('Unexpected error: ' + e.message);
    }
    setQaLoading(false);
  };

  return (
    <>
      {/* Collapsible History Sidebar */}
      <aside className={`h-full sticky top-[56px] flex-shrink-0 w-72 ${historyOpen ? 'md:flex' : 'hidden'} flex-col border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-colors z-10 rounded-none shadow-none min-h-0`}> 
        <div className="flex-1 overflow-auto min-h-0">
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
      <main className="flex-1 flex flex-col items-center transition-colors h-full rounded-none shadow-none border-0 overflow-auto" style={{marginTop: '56px', paddingBottom: '64px'}}>
        <div className="w-full max-w-2xl flex flex-col gap-6 px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16">
          <header className="w-full flex justify-between items-center pt-4 pb-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-400 drop-shadow-sm tracking-tight">SmartDoc AI</h1>
          </header>
          <TextInput inputText={inputText} setInputText={setInputText} />
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <ThinkingIcon />
            </div>
          ) : (
            <>
              <button
                onClick={handleSummarize}
                disabled={!inputText || loading}
                className="mt-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 shadow-none text-lg font-bold tracking-wide transition-all duration-200"
              >
                Summarize
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
                  {/* QA Section */}
                  <div className="mt-8 flex flex-col gap-3">
                    <label className="font-semibold text-base text-gray-700 dark:text-gray-200">Ask a question about the text:</label>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        placeholder="Type your question..."
                        disabled={qaLoading}
                      />
                      <button
                        onClick={handleAsk}
                        disabled={!question.trim() || qaLoading || !inputText.trim()}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors disabled:opacity-50"
                      >Ask</button>
                    </div>
                    {qaLoading && <div className="py-4"><ThinkingIcon /></div>}
                    {qaError && <div className="text-red-500 font-medium">{qaError}</div>}
                    {qaAnswer && !qaError && (
                      <div className={`rounded-lg p-4 font-semibold shadow-sm transition-colors border ${darkMode ? 'bg-blue-900/30 border-blue-700 text-blue-100' : 'bg-blue-50 border-blue-200 text-blue-900'}`}>
                        <span className={darkMode ? 'text-blue-300' : 'text-blue-700'}>Answer:</span> {qaAnswer}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

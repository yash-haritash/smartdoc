import React, { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import SummaryOutput from './components/SummaryOutput';
import KeywordList from './components/KeywordList';
import { summarizeText } from './utils/summarizeAPI';
import { useTheme } from './components/ThemeContext';
import HistoryPanel from './components/HistoryPanel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { darkMode, setDarkMode } = useTheme();
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('smartdoc-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [historyOpen, setHistoryOpen] = useState(() => {
    const saved = localStorage.getItem('smartdoc-historyOpen');
    return saved === null ? true : JSON.parse(saved);
  });
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    localStorage.setItem('smartdoc-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('smartdoc-historyOpen', JSON.stringify(historyOpen));
  }, [historyOpen]);

  // --- THEME PERSISTENCE FIX (FINAL) ---
  // 1. On first render, set theme state and DOM class synchronously from localStorage (before any other effect)
  React.useLayoutEffect(() => {
    const saved = localStorage.getItem('smartdoc-darkMode');
    const initialDark = saved !== null ? JSON.parse(saved) : false;
    // Only update if different to avoid unnecessary rerenders
    if (darkMode !== initialDark) {
      setDarkMode(initialDark);
    }
    if (initialDark) {
      document.documentElement.classList.add('custom-dark');
      document.documentElement.classList.remove('custom-light');
    } else {
      document.documentElement.classList.add('custom-light');
      document.documentElement.classList.remove('custom-dark');
    }
  }, []);

  // 2. Keep localStorage and DOM in sync with state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('custom-dark');
      document.documentElement.classList.remove('custom-light');
    } else {
      document.documentElement.classList.add('custom-light');
      document.documentElement.classList.remove('custom-dark');
    }
    localStorage.setItem('smartdoc-darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await summarizeText(inputText);
      if (result.startsWith('Error:')) {
        setError(result);
        setSummary('');
      } else {
        setSummary(result);
        setHistory(prev => [{ input: inputText, summary: result, id: Date.now() }, ...prev]);
      }
    } catch (e) {
      setError('Unexpected error: ' + e.message);
      setSummary('');
    }
    setLoading(false);
  };

  const handleHistoryClick = (item) => {
    setInputText(item.input);
    setSummary(item.summary);
    setError('');
  };

  const handleDeleteHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className={`h-screen flex flex-col transition-colors font-sans ${darkMode ? 'custom-dark' : 'custom-light'}`}>  
      <Navbar onAbout={setShowAbout} activePage={showAbout ? 'about' : 'home'} />
      <div className={`flex w-full min-h-0 ${darkMode ? 'bg-gray-950' : 'bg-blue-50'} transition-colors`} style={{flex: 1, height: 'calc(100vh - 56px - 48px)'}}>
        {showAbout ? (
          <main className="flex-1 flex flex-col items-center justify-center bg-transparent h-full overflow-auto">
            <AboutPage />
          </main>
        ) : (
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
            <main className={`pt-8 flex-1 flex flex-col items-center justify-center transition-colors h-full rounded-none shadow-none mt-8 mb-0 border-0 overflow-auto `}>
              <div className="w-full max-w-2xl flex flex-col gap-6 px-6 py-8 md:px-12 md:py-12">
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { summarizeText } from './utils/summarizeAPI';
import { useTheme } from './components/ThemeContext';
import HistoryPanel from './components/HistoryPanel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import Home from './components/Home';

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
    <BrowserRouter>
      <div className={`h-screen flex flex-col transition-colors font-sans ${darkMode ? 'custom-dark' : 'custom-light'}`}>  
        <Navbar />
        <div className={`flex w-full min-h-0 ${darkMode ? 'bg-gray-950' : 'bg-blue-50'} transition-colors`} style={{flex: 1, height: 'calc(100vh - 56px - 48px)'}}>
          <Routes>
            <Route path="/about" element={
              <main className="flex-1 flex flex-col items-center justify-center bg-transparent h-full overflow-auto">
                <AboutPage />
              </main>
            } />
            <Route path="/" element={
              <Home
                inputText={inputText}
                setInputText={setInputText}
                summary={summary}
                setSummary={setSummary}
                loading={loading}
                error={error}
                handleSummarize={handleSummarize}
                history={history}
                historyOpen={historyOpen}
                setHistoryOpen={setHistoryOpen}
                handleHistoryClick={handleHistoryClick}
                handleDeleteHistory={handleDeleteHistory}
                setError={setError}
              />
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import App from './App.jsx';

export default function MainApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

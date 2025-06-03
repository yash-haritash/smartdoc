import React from "react";
import { useTheme } from './ThemeContext';


const stopWords = new Set([
  "this", "that", "with", "from", "have", "they", "there", "what", "which",
  "their", "about", "would", "when", "make", "like", "been", "were", "some",
  "other", "more", "most", "into", "over", "than", "then", "them", "these",
  "does", "will", "just", "should", "could", "very", "also", "such", "because",
  "through", "during", "before", "after", "while", "where", "here", "your",
  "those", "being", "between", "under", "only", "both", "same", "each", "many"
]);

function simpleStem(word) {
  return word;
}

function getKeywords(text) {

  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];

  const filteredWords = words
    .filter(word => !stopWords.has(word))
    .map(word => simpleStem(word));

  const freqMap = {};
  filteredWords.forEach(word => {
    if (!freqMap[word]) {
      freqMap[word] = { count: 0, score: 0 };
    }
    freqMap[word].count += 1;
    freqMap[word].score = freqMap[word].count + (word.length * 0.1);
  });

  return Object.entries(freqMap)
    .sort((a, b) => b[1].score - b[1].score) 
    .slice(0, 10)
    .map(entry => entry[0]); 
}

export default function KeywordList({ text }) {
  const { darkMode } = useTheme();
  const keywords = getKeywords(text);

  return (
    <div className={`mt-6 transition-colors rounded-xl shadow p-6 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>Top Keywords:</h3>
      <ul className={`list-disc ml-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {keywords.map((word, idx) => <li key={idx}>{word}</li>)}
      </ul>
    </div>
  );
}
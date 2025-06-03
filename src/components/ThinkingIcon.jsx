import React from 'react';

export default function ThinkingIcon() {
  return (
    <>
      <style>{`
        @keyframes face-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .face-bounce {
          animation: face-bounce 1.2s ease-in-out infinite;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center">
        <svg className="animate-spin-slow" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="6" opacity="0.2" />
          <path d="M32 4a28 28 0 0128 28" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
          <circle cx="48" cy="16" r="5" fill="#38bdf8" stroke="#2563eb" strokeWidth="2" />
          <ellipse cx="32" cy="48" rx="10" ry="4" fill="#2563eb" opacity="0.15" />
          <g className="face-bounce">
            <circle cx="32" cy="32" r="12" fill="#fff" stroke="#2563eb" strokeWidth="2" />
            <ellipse cx="36" cy="30" rx="2.5" ry="3.5" fill="#2563eb" />
            <ellipse cx="28" cy="30" rx="2.5" ry="3.5" fill="#2563eb" />
            <path d="M28 38c1.5 2 6.5 2 8 0" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
        <span className="mt-2 text-blue-700 dark:text-blue-300 font-semibold text-lg animate-pulse">Thinking...</span>
      </div>
    </>
  );
}

// Add this to your tailwind.config.js for slow spin:
// animation: {
//   'spin-slow': 'spin 1.5s linear infinite',
// },

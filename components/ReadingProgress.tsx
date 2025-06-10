import React, { useState, useEffect } from 'react';

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableElement = document.querySelector('main > div > div'); // The scrollable inner div
      if (!scrollableElement) return;

      const scrollTop = scrollableElement.scrollTop;
      const scrollHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
      const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      setProgress(Math.round(scrollProgress));
    };

    const scrollableElement = document.querySelector('main > div > div');
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', updateProgress);
      updateProgress(); // Initial calculation
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', updateProgress);
      }
    };
  }, []);

  return (
    <>
      {/* Progress bar at top of viewport */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800/50 z-[1001]">
        <div 
          className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Floating progress indicator */}
      <div className="fixed bottom-8 right-8 bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full 
                      border border-sky-500/30 shadow-xl z-50 hidden md:flex items-center space-x-2">
        <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="text-sm font-medium text-slate-200">{progress}% read</span>
      </div>
    </>
  );
};

export default ReadingProgress;
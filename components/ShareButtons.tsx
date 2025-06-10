import React, { useState } from 'react';

interface ShareButtonsProps {
  sectionTitle: string;
  sectionPath: string;
  content?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ sectionTitle, sectionPath, content }) => {
  const [copyFeedback, setCopyFeedback] = useState<'link' | 'text' | null>(null);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionPath}`;
    await navigator.clipboard.writeText(url);
    setCopyFeedback('link');
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleCopyText = async () => {
    if (!content) return;
    const textToCopy = `${sectionTitle}\n\n${content}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopyFeedback('text');
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-sky-300 
                   transition-all duration-200 group relative"
        aria-label="Copy link to section"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {copyFeedback === 'link' && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded whitespace-nowrap">
            Link copied!
          </span>
        )}
      </button>

      {content && (
        <button
          onClick={handleCopyText}
          className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-sky-300 
                     transition-all duration-200 group relative"
          aria-label="Copy section text"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copyFeedback === 'text' && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded whitespace-nowrap">
              Text copied!
            </span>
          )}
        </button>
      )}

      <button
        onClick={handlePrint}
        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-sky-300 
                   transition-all duration-200"
        aria-label="Print section"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      </button>
    </div>
  );
};

export default ShareButtons;
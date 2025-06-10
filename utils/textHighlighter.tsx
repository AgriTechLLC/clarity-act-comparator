import React from 'react';

export const highlightText = (text: string, searchQuery: string): React.ReactNode => {
  if (!searchQuery || searchQuery.length < 2) {
    return text;
  }

  const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <mark 
          key={index} 
          className="bg-yellow-500/40 text-yellow-100 px-0.5 rounded"
        >
          {part}
        </mark>
      );
    }
    return part;
  });
};

export const highlightDifferences = (
  originalText: string, 
  comparedText: string
): { original: React.ReactNode; compared: React.ReactNode } => {
  // Simple word-based diff highlighting
  const originalWords = originalText.split(/\s+/);
  const comparedWords = comparedText.split(/\s+/);
  
  const highlightedOriginal = originalWords.map((word, index) => {
    if (!comparedWords.includes(word)) {
      return (
        <span key={index}>
          <span className="bg-red-500/30 text-red-200 px-0.5 rounded">{word}</span>{' '}
        </span>
      );
    }
    return <span key={index}>{word} </span>;
  });

  const highlightedCompared = comparedWords.map((word, index) => {
    if (!originalWords.includes(word)) {
      return (
        <span key={index}>
          <span className="bg-green-500/30 text-green-200 px-0.5 rounded">{word}</span>{' '}
        </span>
      );
    }
    return <span key={index}>{word} </span>;
  });

  return {
    original: highlightedOriginal,
    compared: highlightedCompared
  };
};
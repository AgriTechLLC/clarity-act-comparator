import React, { useState, useCallback } from 'react';
import { ComparisonTableRow } from '../types'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import SparklesIcon from './icons/SparklesIcon';
import Loading from './Loading';

interface TableRowAISummaryProps {
  rowData: ComparisonTableRow;
  aiClient: GoogleGenerativeAI;
  apiKeyMissing: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  displayOnlyContent?: boolean; // To control if button or content is shown
}

const TableRowAISummary: React.FC<TableRowAISummaryProps> = ({
  rowData,
  aiClient,
  apiKeyMissing,
  isExpanded,
  onToggle,
  displayOnlyContent = false,
}) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummaryForRow = useCallback(async () => {
    if (isLoading || summary || error) { // Don't refetch if already loaded, loading, or errored
        onToggle(); // Just toggle visibility
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setSummary(null);
    onToggle(); // Open the expansion area

    const promptParts = [
      `Concisely summarize the legislative provision "${rowData.provision}". Focus on the core aspects from each version and the main points of divergence.`,
      `Original Bill Summary: ${Array.isArray(rowData.originalSummary) ? rowData.originalSummary.join(' ') : rowData.originalSummary}`,
      `HFSC ANS Analysis: ${Array.isArray(rowData.hfscAnalysis) ? rowData.hfscAnalysis.join(' ') : rowData.hfscAnalysis}`,
      `HAG ANS Analysis: ${Array.isArray(rowData.hagAnalysis) ? rowData.hagAnalysis.join(' ') : rowData.hagAnalysis}`,
      `Key Differences (HFSC vs HAG): ${Array.isArray(rowData.keyDifferencesHfscVsHag) ? rowData.keyDifferencesHfscVsHag.join(' ') : rowData.keyDifferencesHfscVsHag}`,
      "\nProvide a brief, synthesized insight into this provision's evolution and critical distinctions in 1-2 short paragraphs."
    ];
    const fullPrompt = promptParts.join('\n\n');

    try {
      const response: GenerateContentResponse = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: fullPrompt,
        config: { temperature: 0.2, topK: 20, topP: 0.85 }
      });
      setSummary(response.text);
    } catch (e) {
      console.error(`Error generating summary for ${rowData.provision}:`, e);
      let errorMessage = "Failed to generate AI Insight.";
      if (e instanceof Error) {
        errorMessage = `AI Error: ${e.message}.`;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [aiClient, rowData, isLoading, summary, error, onToggle]);


  if (displayOnlyContent) {
    if (isLoading) {
        return <p className="text-sky-300 italic animate-pulse text-sm py-2">AI analyzing provision...</p>;
    }
    if (error) {
        return <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-md text-red-300 text-xs shadow-sm"><p className="font-semibold">Error:</p><p>{error}</p></div>;
    }
    if (summary) {
        return (
            <div className="text-slate-200 text-xs space-y-2 leading-relaxed whitespace-pre-wrap prose prose-xs prose-invert max-w-none prose-p:text-slate-200">
            {summary.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            </div>
        );
    }
    return null; // Nothing to display if not loading, no error, no summary
  }


  return (
    <div className="flex items-center justify-center">
      <button
        onClick={generateSummaryForRow}
        disabled={apiKeyMissing || (isLoading && isExpanded)}
        className={`p-1.5 rounded-full transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                    ${apiKeyMissing ? 'cursor-not-allowed opacity-50' : 'hover:bg-sky-700/50 focus:ring-sky-500'}
                    ${isExpanded && !error ? 'bg-sky-600/70 text-white' : 'text-sky-400 hover:text-sky-300'}
                  `}
        title={apiKeyMissing ? "API Key missing" : (isExpanded ? "Hide AI Insight" : "Get AI Insight")}
        aria-live="polite"
        aria-expanded={isExpanded}
      >
        {isLoading && isExpanded ? (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <SparklesIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default TableRowAISummary;
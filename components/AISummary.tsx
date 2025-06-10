import React, { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AISummaryProps {
  aiClient: GoogleGenerativeAI;
  textContent: string;
}

const AISummary: React.FC<AISummaryProps> = ({ aiClient, textContent }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(false);

  const generateSummary = useCallback(async () => {
    if (!textContent) return;

    setIsLoading(true);
    setError(null);
    setSummary(null); // Clear previous summary before fetching new one
    setIsSummaryVisible(true); 

    try {
      console.log('Attempting to generate AI summary...');
      const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Concisely summarize the key points of the following legislative text in 2-3 short paragraphs, focusing on the core provisions, objectives, and any noted differences or implications for regulatory frameworks:\n\n${textContent.substring(0, 3000)}`; // Limit text length
      
      console.log('Sending request to Gemini API...');
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('AI summary generated successfully');
      setSummary(text);
    } catch (e) {
      console.error("Error generating summary:", e);
      let errorMessage = "Failed to generate AI Insight. Please check your network or API key and try again.";
      if (e instanceof Error) {
        errorMessage = `AI Insight Error: ${e.message}.`;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [aiClient, textContent]);

  const handleToggleSummary = () => {
    if (!isSummaryVisible) { 
        // If not visible, and no summary/error yet, or if there was an error, try generating.
        if ((!summary && !error) || error) { 
            generateSummary();
        } else {
            setIsSummaryVisible(true); // Otherwise, just show existing summary/loading state
        }
    } else { 
        setIsSummaryVisible(false); // If visible, hide it.
    }
  };

  return (
    <div className="mt-6 pt-5 border-t border-sky-500/30">
      <button
        onClick={handleToggleSummary}
        disabled={isLoading && isSummaryVisible} // Disable only if loading AND summary is already trying to be visible
        className="px-5 py-2.5 bg-gradient-to-br from-sky-500 via-cyan-500 to-sky-600 hover:from-sky-400 hover:via-cyan-400 hover:to-sky-500 
                   text-white text-sm font-semibold rounded-lg shadow-xl hover:shadow-cyan-500/40 futuristic-glow-border
                   transition-all duration-300 ease-in-out transform hover:scale-105 
                   disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100
                   focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-850 
                   flex items-center justify-center"
        aria-live="polite"
        aria-controls="ai-summary-content"
        aria-expanded={isSummaryVisible}
      >
        {isLoading && isSummaryVisible && (
          <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isLoading && isSummaryVisible ? 'AI Analyzing...' : (isSummaryVisible ? 'Hide AI Insight' : 'Generate AI Insight')}
      </button>

      {isSummaryVisible && (
        <div id="ai-summary-content" className="mt-5 p-5 bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl border border-sky-500/40 futuristic-glow-border">
          {isLoading && <p className="text-sky-300 italic animate-pulse text-center py-3 text-sm">AI generating insights, please wait...</p>}
          {error && !isLoading && (
            <div className="p-4 bg-red-900/50 border border-red-700/70 rounded-md text-red-200 text-sm shadow-md">
              <p className="font-semibold mb-1.5 text-red-100">Error Generating Insight:</p>
              <p>{error}</p>
            </div>
          )}
          {summary && !isLoading && (
            <>
              <h4 className="text-md font-lexend font-semibold text-sky-300 mb-3.5 pb-2.5 border-b border-sky-500/40 futuristic-glow-text">AI-Generated Insight</h4>
              <div className="text-slate-200 text-sm space-y-3.5 leading-relaxed whitespace-pre-wrap prose prose-sm prose-invert max-w-none prose-p:text-slate-200">
                {summary.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AISummary;
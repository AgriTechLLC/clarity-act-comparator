import React, { useState } from 'react';
import { BillVersionComparison } from '../types';

interface ComparisonViewProps {
  comparison: BillVersionComparison;
}

const renderPanelContent = (content: string | string[] | undefined, versionType?: 'original' | 'hfsc' | 'hag' | 'keyDifferences') => {
  if (!content && versionType !== 'keyDifferences') return <p className="text-slate-400 italic text-sm p-4">No specific details provided for this version in the selected summary.</p>;
  if (!content && versionType === 'keyDifferences') return <p className="text-slate-400 italic text-sm p-4">No key differences explicitly noted for this provision, or they are integrated within the version texts.</p>;

  const contentArray = Array.isArray(content) ? content : [content];

  return (
    <div className="space-y-3.5 text-sm text-slate-200 leading-relaxed">
      {contentArray.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

type ActiveView = 'keyDifferences' | 'hfsc' | 'hag';

const ComparisonView: React.FC<ComparisonViewProps> = ({ comparison }) => {
  const [activeView, setActiveView] = useState<ActiveView>('keyDifferences');

  const getPanelContent = () => {
    switch (activeView) {
      case 'hfsc':
        return comparison.hfsc;
      case 'hag':
        return comparison.hag;
      case 'keyDifferences':
      default:
        return comparison.keyDifferences;
    }
  };
  
  const getPanelTitle = () => {
     switch (activeView) {
      case 'hfsc':
        return "HFSC ANS";
      case 'hag':
        return "HAG ANS";
      case 'keyDifferences':
      default:
        return "Key Differences (HFSC vs. HAG)";
    }
  }

  const getPanelAccentColor = () => {
    switch (activeView) {
      case 'hfsc':
      case 'hag':
        return 'sky';
      case 'keyDifferences':
      default:
        return 'emerald';
    }
  }

  const baseButtonClass = "flex-1 sm:flex-none px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-md futuristic-glow-border";
  const activeButtonClass = "text-white shadow-lg";
  const inactiveButtonClass = "text-slate-300 hover:text-white";

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Panel: Original Bill */}
        <div className="lg:w-1/2 bg-slate-800/80 backdrop-blur-md p-5 rounded-xl shadow-xl border border-sky-500/30 futuristic-glow-border flex-1 min-w-[280px]">
          <h3 className="text-md sm:text-lg font-lexend font-semibold text-sky-300 mb-3.5 border-b border-sky-500/40 pb-3 futuristic-glow-text">Original Bill</h3>
          <div className="prose prose-sm prose-invert max-w-none">
            {renderPanelContent(comparison.original, 'original')}
          </div>
        </div>

        {/* Right Panel: Dynamic Content */}
        <div className={`lg:w-1/2 bg-slate-800/80 backdrop-blur-md p-5 rounded-xl shadow-xl border futuristic-glow-border flex-1 min-w-[280px] flex flex-col border-${getPanelAccentColor()}-500/40`}>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 border-b border-slate-700/60 pb-3 mb-3.5">
              <button 
                onClick={() => setActiveView('keyDifferences')}
                className={`${baseButtonClass} ${activeView === 'keyDifferences' ? `${activeButtonClass} bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-400` : `${inactiveButtonClass} bg-slate-600/80 hover:bg-emerald-700/70`}`}
              >
                Key Differences
              </button>
              <button 
                onClick={() => setActiveView('hfsc')}
                className={`${baseButtonClass} ${activeView === 'hfsc' ? `${activeButtonClass} bg-sky-600 hover:bg-sky-500 focus:ring-sky-400` : `${inactiveButtonClass} bg-slate-600/80 hover:bg-sky-700/70`}`}
              >
                HFSC ANS
              </button>
              <button 
                onClick={() => setActiveView('hag')}
                className={`${baseButtonClass} ${activeView === 'hag' ? `${activeButtonClass} bg-sky-600 hover:bg-sky-500 focus:ring-sky-400` : `${inactiveButtonClass} bg-slate-600/80 hover:bg-sky-700/70`}`}
              >
                HAG ANS
              </button>
            </div>
             <h3 className={`text-md sm:text-lg font-lexend font-semibold text-${getPanelAccentColor()}-300 futuristic-glow-text`}>{getPanelTitle()}</h3>
          </div>
          <div className="prose prose-sm prose-invert max-w-none flex-grow">
            {renderPanelContent(getPanelContent(), activeView)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
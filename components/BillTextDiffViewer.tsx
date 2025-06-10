import React, { useState, useEffect, useMemo } from 'react';
import { diffLines, Change } from 'diff';
import Loading from './Loading';
import { BillTextNormalizer } from '../utils/billTextNormalizer';

interface BillTextDiffViewerProps {
  originalText: string;
  comparedText: string;
  originalLabel?: string;
  comparedLabel?: string;
}

const BillTextDiffViewer: React.FC<BillTextDiffViewerProps> = ({
  originalText,
  comparedText,
  originalLabel = 'Original',
  comparedLabel = 'Modified'
}) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const [isCalculating, setIsCalculating] = useState(true);
  const [useNormalization, setUseNormalization] = useState(true);

  const differences = useMemo(() => {
    setIsCalculating(true);
    
    let textToCompareOriginal = originalText;
    let textToCompareCompared = comparedText;
    
    if (useNormalization) {
      // Normalize the texts before comparison
      textToCompareOriginal = BillTextNormalizer.prepareForDiff(originalText);
      textToCompareCompared = BillTextNormalizer.prepareForDiff(comparedText);
    }
    
    // Now diff the versions
    const result = diffLines(textToCompareOriginal, textToCompareCompared, { 
      ignoreWhitespace: false,
      newlineIsToken: true 
    });
    
    setIsCalculating(false);
    return result;
  }, [originalText, comparedText, useNormalization]);

  const stats = useMemo(() => {
    let additions = 0;
    let deletions = 0;
    let unchanged = 0;

    differences.forEach(part => {
      const lines = part.value.split('\n').filter(line => line.length > 0).length;
      if (part.added) additions += lines;
      else if (part.removed) deletions += lines;
      else unchanged += lines;
    });

    return { additions, deletions, unchanged };
  }, [differences]);

  const renderSideBySide = () => {
    const leftLines: JSX.Element[] = [];
    const rightLines: JSX.Element[] = [];
    let leftLineNum = 1;
    let rightLineNum = 1;

    differences.forEach((part, partIndex) => {
      const lines = part.value.split('\n').filter((_, i, arr) => i < arr.length - 1 || arr[i]);
      
      lines.forEach((line, lineIndex) => {
        const key = `${partIndex}-${lineIndex}`;
        
        if (part.removed) {
          leftLines.push(
            <div key={`left-${key}`} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none">{leftLineNum++}</span>
              <span className="flex-1 bg-red-900/20 text-red-300 px-2">{line || ' '}</span>
            </div>
          );
          rightLines.push(
            <div key={`right-${key}`} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none"> </span>
              <span className="flex-1 px-2"> </span>
            </div>
          );
        } else if (part.added) {
          leftLines.push(
            <div key={`left-${key}`} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none"> </span>
              <span className="flex-1 px-2"> </span>
            </div>
          );
          rightLines.push(
            <div key={`right-${key}`} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none">{rightLineNum++}</span>
              <span className="flex-1 bg-green-900/20 text-green-300 px-2">{line || ' '}</span>
            </div>
          );
        } else {
          leftLines.push(
            <div key={`left-${key}`} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none">{leftLineNum++}</span>
              <span className="flex-1 px-2 text-slate-300">{line || ' '}</span>
            </div>
          );
          rightLines.push(
            <div key={`right-${key}`} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none">{rightLineNum++}</span>
              <span className="flex-1 px-2 text-slate-300">{line || ' '}</span>
            </div>
          );
        }
      });
    });

    return (
      <div className="flex gap-4">
        <div className="flex-1 overflow-x-auto">
          <div className="sticky top-0 bg-slate-800 p-2 font-medium text-sky-300 border-b border-slate-700">
            {originalLabel}
          </div>
          <div className="font-mono text-sm">{leftLines}</div>
        </div>
        <div className="w-px bg-slate-700"></div>
        <div className="flex-1 overflow-x-auto">
          <div className="sticky top-0 bg-slate-800 p-2 font-medium text-sky-300 border-b border-slate-700">
            {comparedLabel}
          </div>
          <div className="font-mono text-sm">{rightLines}</div>
        </div>
      </div>
    );
  };

  const renderUnified = () => {
    const lines: JSX.Element[] = [];
    let lineNum = 1;

    differences.forEach((part, partIndex) => {
      const partLines = part.value.split('\n').filter((_, i, arr) => i < arr.length - 1 || arr[i]);
      
      partLines.forEach((line, lineIndex) => {
        const key = `${partIndex}-${lineIndex}`;
        
        if (part.removed) {
          lines.push(
            <div key={key} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none">-</span>
              <span className="flex-1 bg-red-900/20 text-red-300 px-2">{line || ' '}</span>
            </div>
          );
        } else if (part.added) {
          lines.push(
            <div key={key} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none">+</span>
              <span className="flex-1 bg-green-900/20 text-green-300 px-2">{line || ' '}</span>
            </div>
          );
        } else {
          lines.push(
            <div key={key} className="flex">
              <span className="w-12 text-right pr-2 text-slate-500 select-none">{lineNum++}</span>
              <span className="flex-1 px-2 text-slate-300">{line || ' '}</span>
            </div>
          );
        }
      });
    });

    return <div className="font-mono text-sm">{lines}</div>;
  };

  if (isCalculating) {
    return <Loading text="Calculating differences..." />;
  }

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="bg-slate-800/50 p-4 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-green-400">
              <span className="font-semibold">+{stats.additions}</span> additions
            </span>
            <span className="text-red-400">
              <span className="font-semibold">-{stats.deletions}</span> deletions
            </span>
            <span className="text-slate-400">
              <span className="font-semibold">{stats.unchanged}</span> unchanged
            </span>
          </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'side-by-side' 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'unified' 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Unified
            </button>
          </div>
          
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={useNormalization}
              onChange={(e) => setUseNormalization(e.target.checked)}
              className="rounded"
            />
            Smart comparison
            <span className="text-xs text-slate-500">(ignores formatting)</span>
          </label>
        </div>
        </div>
        
        {useNormalization && (
          <div className="text-xs text-slate-500 bg-slate-900/50 p-2 rounded">
            <span className="text-sky-400">Smart comparison enabled:</span> Ignoring page numbers, timestamps, file metadata, and formatting differences to show only substantive changes.
          </div>
        )}
      </div>

      {/* Diff Content */}
      <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
        <div className="max-h-[600px] overflow-y-auto p-4">
          {viewMode === 'side-by-side' ? renderSideBySide() : renderUnified()}
        </div>
      </div>
    </div>
  );
};

export default BillTextDiffViewer;
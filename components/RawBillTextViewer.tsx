import React, { useState, useEffect } from 'react';
import { BillTextParser, ParsedBill } from '../utils/billTextParser';
import BillTextDiffViewer from './BillTextDiffViewer';
import Loading from './Loading';
import SearchBar from './SearchBar';

interface RawBillTextViewerProps {
  onClose?: () => void;
}

type BillVersion = 'original' | 'hfsc' | 'hag';

const RawBillTextViewer: React.FC<RawBillTextViewerProps> = ({ onClose }) => {
  const [bills, setBills] = useState<Record<BillVersion, ParsedBill | null>>({
    original: null,
    hfsc: null,
    hag: null
  });
  const [loading, setLoading] = useState(true);
  const [selectedVersions, setSelectedVersions] = useState<[BillVersion, BillVersion]>(['original', 'hfsc']);
  const [viewMode, setViewMode] = useState<'diff' | 'browse'>('diff');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    version: BillVersion;
    results: Array<{lineNumber: number; text: string; section: string}>
  }>>([]);

  useEffect(() => {
    loadBillTexts();
  }, []);

  const loadBillTexts = async () => {
    setLoading(true);
    try {
      // Load all three bill versions
      const [originalRes, hfscRes, hagRes] = await Promise.all([
        fetch('/data/Bill Text/OG Clarity Act.txt'),
        fetch('/data/Bill Text/HFSC BILLS-119pih-ANStoHR3633offeredbyChairmanThompsonofPennsylvania-U1.txt'),
        fetch('/data/Bill Text/HAG BILLS-119-HR3633-H001072-Amdt-4.txt')
      ]);

      const [originalText, hfscText, hagText] = await Promise.all([
        originalRes.text(),
        hfscRes.text(),
        hagRes.text()
      ]);

      setBills({
        original: new BillTextParser(originalText).parse(),
        hfsc: new BillTextParser(hfscText).parse(),
        hag: new BillTextParser(hagText).parse()
      });
    } catch (error) {
      console.error('Error loading bill texts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    const results: typeof searchResults = [];
    
    Object.entries(bills).forEach(([version, bill]) => {
      if (bill) {
        const parser = new BillTextParser(bill.rawText);
        const versionResults = parser.searchInBill(query);
        if (versionResults.length > 0) {
          results.push({
            version: version as BillVersion,
            results: versionResults
          });
        }
      }
    });

    setSearchResults(results);
  };

  const getVersionLabel = (version: BillVersion) => {
    switch (version) {
      case 'original': return 'Original Bill';
      case 'hfsc': return 'HFSC Amendment';
      case 'hag': return 'HAG Amendment';
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-slate-900 p-8 rounded-xl">
          <Loading text="Loading bill texts..." size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-lexend font-bold text-sky-300">Raw Bill Text Analysis</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('diff')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'diff' 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Compare Versions
            </button>
            <button
              onClick={() => setViewMode('browse')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'browse' 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Search & Browse
            </button>
          </div>

          {/* Version Selectors for Diff Mode */}
          {viewMode === 'diff' && (
            <div className="flex items-center gap-2">
              <select
                value={selectedVersions[0]}
                onChange={(e) => setSelectedVersions([e.target.value as BillVersion, selectedVersions[1]])}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="original">Original Bill</option>
                <option value="hfsc">HFSC Amendment</option>
                <option value="hag">HAG Amendment</option>
              </select>
              <span className="text-slate-400">vs</span>
              <select
                value={selectedVersions[1]}
                onChange={(e) => setSelectedVersions([selectedVersions[0], e.target.value as BillVersion])}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="original">Original Bill</option>
                <option value="hfsc">HFSC Amendment</option>
                <option value="hag">HAG Amendment</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'diff' ? (
          <div className="h-full p-4 overflow-y-auto">
            {bills[selectedVersions[0]] && bills[selectedVersions[1]] && (
              <BillTextDiffViewer
                originalText={bills[selectedVersions[0]].rawText}
                comparedText={bills[selectedVersions[1]].rawText}
                originalLabel={getVersionLabel(selectedVersions[0])}
                comparedLabel={getVersionLabel(selectedVersions[1])}
              />
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="p-4">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search across all bill versions..."
              />
            </div>
            
            {searchResults.length > 0 ? (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  {searchResults.map(({ version, results }) => (
                    <div key={version} className="bg-slate-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-sky-300 mb-3">
                        {getVersionLabel(version)} ({results.length} matches)
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {results.slice(0, 10).map((result, idx) => (
                          <div key={idx} className="bg-slate-900 p-3 rounded text-sm">
                            <div className="text-slate-500 text-xs mb-1">
                              Line {result.lineNumber} • {result.section}
                            </div>
                            <div className="text-slate-200 font-mono">
                              {result.text}
                            </div>
                          </div>
                        ))}
                        {results.length > 10 && (
                          <div className="text-slate-400 text-sm text-center py-2">
                            ... and {results.length - 10} more matches
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : searchQuery.length >= 2 ? (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                No matches found for "{searchQuery}"
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>Enter a search term to find text across all bill versions</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RawBillTextViewer;
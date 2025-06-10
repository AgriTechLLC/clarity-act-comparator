import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BillTextParser, ParsedBill, BillSection } from '../utils/billTextParser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BillTextDiffViewer from './BillTextDiffViewer';
import Loading from './Loading';
import SearchBar from './SearchBar';
import { BillExporter, ExportOptions } from '../utils/exportUtils';

interface EnhancedBillTextViewerProps {
  onClose?: () => void;
  aiClient: GoogleGenerativeAI | null;
}

type BillVersion = 'original' | 'hfsc' | 'hag';
type ViewMode = 'diff' | 'browse' | 'timeline';

const EnhancedBillTextViewer: React.FC<EnhancedBillTextViewerProps> = ({ onClose, aiClient }) => {
  const [bills, setBills] = useState<Record<BillVersion, ParsedBill | null>>({
    original: null,
    hfsc: null,
    hag: null
  });
  const [loading, setLoading] = useState(true);
  const [selectedVersions, setSelectedVersions] = useState<[BillVersion, BillVersion]>(['original', 'hfsc']);
  const [viewMode, setViewMode] = useState<ViewMode>('diff');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<BillSection | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [syncScroll, setSyncScroll] = useState(true);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadBillTexts();
  }, []);

  const loadBillTexts = async () => {
    setLoading(true);
    try {
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

      // Parse bills with enhanced parser
      const parsedBills = {
        original: parseBillWithEnhancements(originalText, 'original'),
        hfsc: parseBillWithEnhancements(hfscText, 'hfsc'),
        hag: parseBillWithEnhancements(hagText, 'hag')
      };

      setBills(parsedBills);
    } catch (error) {
      console.error('Error loading bill texts:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseBillWithEnhancements = (text: string, version: BillVersion): ParsedBill => {
    const parser = new BillTextParser(text);
    const parsed = parser.parse();
    
    // Enhanced parsing for sections with proper hierarchy
    const enhancedSections = enhanceSectionParsing(text);
    parsed.sections = enhancedSections;
    
    return parsed;
  };

  const enhanceSectionParsing = (text: string): BillSection[] => {
    const lines = text.split('\n');
    const sections: BillSection[] = [];
    const stack: BillSection[] = [];
    
    // Regex patterns for different section types
    const titleRegex = /^TITLE\s+([IVXLCDM]+)[—–]\s*(.+)$/;
    const sectionRegex = /^(?:\d+\s+)?SEC(?:TION)?\.\s*(\d+)\.\s*(.+?)\.?$/;
    const subsectionRegex = /^\s*\(([a-z])\)\s+(.+?)\.?—/i;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Title matching
      const titleMatch = line.match(titleRegex);
      if (titleMatch) {
        const section: BillSection = {
          sectionNumber: `TITLE ${titleMatch[1]}`,
          title: titleMatch[2].trim(),
          content: '',
          lineStart: i + 1,
          lineEnd: i + 1,
          level: 0,
          type: 'title',
          subsections: [],
          citations: []
        };
        sections.push(section);
        stack.length = 0;
        stack.push(section);
        continue;
      }
      
      // Section matching
      const sectionMatch = line.match(sectionRegex);
      if (sectionMatch) {
        const section: BillSection = {
          sectionNumber: `SEC. ${sectionMatch[1]}`,
          title: sectionMatch[2].trim(),
          content: '',
          lineStart: i + 1,
          lineEnd: i + 1,
          level: 1,
          type: 'section',
          subsections: [],
          citations: extractCitations(line)
        };
        
        if (stack.length > 0 && stack[0].type === 'title') {
          stack[0].subsections!.push(section);
        } else {
          sections.push(section);
        }
        
        // Update stack for subsections
        stack.length = Math.min(stack.length, 1);
        stack.push(section);
        continue;
      }
      
      // Extract content for current section
      if (stack.length > 0) {
        const currentSection = stack[stack.length - 1];
        currentSection.content += line + '\n';
        currentSection.lineEnd = i + 1;
        
        // Extract citations from content
        const newCitations = extractCitations(line);
        if (newCitations.length > 0) {
          currentSection.citations = [...(currentSection.citations || []), ...newCitations];
        }
      }
    }
    
    return sections;
  };

  const extractCitations = (text: string): string[] => {
    const citations: string[] = [];
    
    // Pattern for section references (e.g., "Section 10(b)", "15 U.S.C. 78j(b)")
    const sectionPattern = /(?:Section|Sec\.?)\s+\d+(?:\([a-z]\))?(?:\(\d+\))?/gi;
    const uscPattern = /\d+\s+U\.S\.C\.?\s+\d+[a-z]?(?:\([a-z]\))?/gi;
    const cfrPattern = /\d+\s+C\.F\.R\.?\s+(?:Part\s+)?\d+\.?\d*/gi;
    
    const patterns = [sectionPattern, uscPattern, cfrPattern];
    
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        citations.push(...matches);
      }
    });
    
    return [...new Set(citations)]; // Remove duplicates
  };

  const generateAISummary = async (section: BillSection) => {
    if (!aiClient || !section) return;
    
    setAiLoading(true);
    setAiSummary('');
    
    try {
      const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Provide a concise summary of this legislative section in 2-3 sentences. Focus on the key provisions and their implications:

Section: ${section.sectionNumber} - ${section.title}
Content: ${section.content.substring(0, 2000)}...`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAiSummary(response.text());
    } catch (error) {
      console.error('Error generating AI summary:', error);
      setAiSummary('Failed to generate summary. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSyncScroll = (sourceRef: React.RefObject<HTMLDivElement>, targetRef: React.RefObject<HTMLDivElement>) => {
    if (!syncScroll || !sourceRef.current || !targetRef.current) return;
    
    const sourceScrollPercentage = sourceRef.current.scrollTop / (sourceRef.current.scrollHeight - sourceRef.current.clientHeight);
    targetRef.current.scrollTop = sourceScrollPercentage * (targetRef.current.scrollHeight - targetRef.current.clientHeight);
  };

  const handleExport = () => {
    if (!bills[selectedVersions[0]] || !bills[selectedVersions[1]]) return;
    
    const exportOptions: ExportOptions = {
      format: 'html',
      includeHighlights: true,
      includeLineNumbers: true
    };
    
    const html = BillExporter.exportComparison(
      bills[selectedVersions[0]].rawText,
      bills[selectedVersions[1]].rawText,
      getVersionLabel(selectedVersions[0]),
      getVersionLabel(selectedVersions[1]),
      exportOptions
    );
    
    const filename = `bill-comparison-${selectedVersions[0]}-vs-${selectedVersions[1]}-${Date.now()}.html`;
    BillExporter.downloadFile(html, filename, 'text/html');
  };

  const getVersionLabel = (version: BillVersion) => {
    switch (version) {
      case 'original': return 'Original Bill';
      case 'hfsc': return 'HFSC Amendment';
      case 'hag': return 'HAG Amendment';
    }
  };

  const renderSectionNavigator = (bill: ParsedBill | null, version: BillVersion) => {
    if (!bill) return null;
    
    const renderSection = (section: BillSection, depth: number = 0) => (
      <div key={`${version}-${section.sectionNumber}`}>
        <button
          onClick={() => {
            setSelectedSection(section);
            generateAISummary(section);
          }}
          className={`w-full text-left py-2 px-3 rounded text-sm hover:bg-slate-700 transition-colors
            ${selectedSection?.sectionNumber === section.sectionNumber ? 'bg-sky-600/30 text-sky-300' : 'text-slate-300'}`}
          style={{ paddingLeft: `${depth * 1.5 + 0.75}rem` }}
        >
          <div className="font-medium">{section.sectionNumber}</div>
          <div className="text-xs text-slate-400 truncate">{section.title}</div>
        </button>
        {section.subsections?.map(sub => renderSection(sub, depth + 1))}
      </div>
    );
    
    return (
      <div className="space-y-1">
        {bill.sections.map(section => renderSection(section))}
      </div>
    );
  };

  const renderTimeline = () => {
    const changes = [
      { date: 'May 29, 2025', version: 'original', label: 'Original Bill Introduced', color: 'bg-blue-500' },
      { date: 'June 8, 2025', version: 'hfsc', label: 'HFSC Amendment', color: 'bg-green-500' },
      { date: 'June 8, 2025', version: 'hag', label: 'HAG Amendment', color: 'bg-purple-500' }
    ];
    
    return (
      <div className="p-8">
        <h3 className="text-2xl font-bold text-sky-300 mb-8">Amendment Timeline</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-600"></div>
          
          {/* Timeline items */}
          <div className="space-y-8">
            {changes.map((change, idx) => (
              <div key={idx} className="flex items-start">
                <div className={`w-4 h-4 rounded-full ${change.color} ring-4 ring-slate-800 z-10`}></div>
                <div className="ml-8">
                  <div className="text-sm text-slate-400">{change.date}</div>
                  <div className="text-lg font-medium text-slate-200">{change.label}</div>
                  {bills[change.version as BillVersion] && (
                    <div className="mt-2 text-sm text-slate-400">
                      {bills[change.version as BillVersion]!.sections.length} sections
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
          <h2 className="text-2xl font-lexend font-bold text-sky-300">Enhanced Bill Text Analysis</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
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
              Compare
            </button>
            <button
              onClick={() => setViewMode('browse')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'browse' 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Timeline
            </button>
          </div>

          {/* Version Selectors */}
          {viewMode === 'diff' && (
            <>
              <div className="flex items-center gap-2">
                <select
                  value={selectedVersions[0]}
                  onChange={(e) => setSelectedVersions([e.target.value as BillVersion, selectedVersions[1]])}
                  className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg"
                >
                  <option value="original">Original Bill</option>
                  <option value="hfsc">HFSC Amendment</option>
                  <option value="hag">HAG Amendment</option>
                </select>
                <span className="text-slate-400">vs</span>
                <select
                  value={selectedVersions[1]}
                  onChange={(e) => setSelectedVersions([selectedVersions[0], e.target.value as BillVersion])}
                  className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg"
                >
                  <option value="original">Original Bill</option>
                  <option value="hfsc">HFSC Amendment</option>
                  <option value="hag">HAG Amendment</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={syncScroll}
                  onChange={(e) => setSyncScroll(e.target.checked)}
                  className="rounded"
                />
                Sync scrolling
              </label>
              <button
                onClick={() => handleExport()}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'timeline' ? (
          renderTimeline()
        ) : viewMode === 'browse' ? (
          <div className="h-full flex">
            {/* Section Navigator */}
            <div className="w-80 bg-slate-800 border-r border-slate-700 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-sky-300 mb-4">Sections</h3>
                <div className="space-y-4">
                  {Object.entries(bills).map(([version, bill]) => bill && (
                    <div key={version}>
                      <h4 className="text-sm font-medium text-slate-400 mb-2">{getVersionLabel(version as BillVersion)}</h4>
                      {renderSectionNavigator(bill, version as BillVersion)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Section Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedSection ? (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-sky-300 mb-2">{selectedSection.sectionNumber}</h2>
                  <h3 className="text-xl text-slate-300 mb-6">{selectedSection.title}</h3>
                  
                  {/* AI Summary */}
                  {aiClient && (
                    <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-sky-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-sky-300">AI Summary</h4>
                        {aiLoading && <Loading size="small" />}
                      </div>
                      {aiSummary ? (
                        <p className="text-sm text-slate-200">{aiSummary}</p>
                      ) : !aiLoading && (
                        <p className="text-sm text-slate-400 italic">Click generate to create an AI summary</p>
                      )}
                    </div>
                  )}
                  
                  {/* Section Info */}
                  <div className="mb-4 text-sm text-slate-400">
                    Lines {selectedSection.lineStart} - {selectedSection.lineEnd}
                    {selectedSection.citations && selectedSection.citations.length > 0 && (
                      <span className="ml-4">• {selectedSection.citations.length} citations</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-slate-200">
                      {selectedSection.content}
                    </pre>
                  </div>
                  
                  {/* Citations */}
                  {selectedSection.citations && selectedSection.citations.length > 0 && (
                    <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                      <h4 className="text-sm font-medium text-sky-300 mb-2">Citations Referenced</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSection.citations.map((citation, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                            {citation}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Select a section to view its content</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full p-4 overflow-y-auto">
            {bills[selectedVersions[0]] && bills[selectedVersions[1]] && (
              <div 
                ref={leftScrollRef}
                onScroll={() => handleSyncScroll(leftScrollRef, rightScrollRef)}
              >
                <BillTextDiffViewer
                  originalText={bills[selectedVersions[0]].rawText}
                  comparedText={bills[selectedVersions[1]].rawText}
                  originalLabel={getVersionLabel(selectedVersions[0])}
                  comparedLabel={getVersionLabel(selectedVersions[1])}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedBillTextViewer;
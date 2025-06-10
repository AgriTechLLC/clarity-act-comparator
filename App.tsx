import React, { useState, useMemo, useCallback, useEffect } from 'react';
import TopNavbar from './components/TopNavbar';
import SectionContentDisplay from './components/SectionContentDisplay';
import SearchBar from './components/SearchBar';
import ReadingProgress from './components/ReadingProgress';
import Breadcrumb from './components/Breadcrumb';
import TableOfContents from './components/TableOfContents';
import EnhancedBillTextViewer from './components/EnhancedBillTextViewer';
import { reportData } from './data/reportData';
import { ReportSectionData, ProcessedReportSectionData } from './types';
import { GoogleGenerativeAI } from '@google/generative-ai';

const processReportData = (sections: ReportSectionData[], parentPath: string = ''): ProcessedReportSectionData[] => {
  return sections.map(section => {
    const currentPath = parentPath ? `${parentPath}/${section.id}` : section.id;
    return {
      ...section,
      path: currentPath,
      subsections: section.subsections ? processReportData(section.subsections, currentPath) : undefined,
    };
  });
};

const findSectionByPath = (sections: ProcessedReportSectionData[], path: string): ProcessedReportSectionData | null => {
  for (const section of sections) {
    if (section.path === path) {
      return section;
    }
    if (section.subsections) {
      const foundInChildren = findSectionByPath(section.subsections, path);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
};

const App: React.FC = () => {
  const [selectedSectionPath, setSelectedSectionPath] = useState<string>('executive-summary');
  const [aiClient, setAiClient] = useState<GoogleGenerativeAI | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showRawBillViewer, setShowRawBillViewer] = useState<boolean>(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
    console.log('Environment variables:', import.meta.env);
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    
    if (apiKey && apiKey !== 'your_api_key_here') {
      console.log('Initializing Google AI client...');
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        setAiClient(genAI);
        setApiKeyMissing(false);
        console.log('Google AI client initialized successfully');
      } catch (error) {
        console.error('Error initializing Google AI client:', error);
        setApiKeyMissing(true);
        setAiClient(null);
      }
    } else {
      console.warn("VITE_GOOGLE_AI_API_KEY environment variable is not set or is default value. AI features will be disabled.");
      setApiKeyMissing(true);
      setAiClient(null);
    }
  }, []);

  const processedSections = useMemo(() => processReportData(reportData), []);

  const selectedSection = useMemo(() => {
    return findSectionByPath(processedSections, selectedSectionPath) || findSectionByPath(processedSections, 'executive-summary');
  }, [selectedSectionPath, processedSections]);
  
  useEffect(() => {
    if (!findSectionByPath(processedSections, selectedSectionPath) && processedSections.length > 0) {
      setSelectedSectionPath('executive-summary');
    }
  }, [selectedSectionPath, processedSections]);

  const handleSelectSection = useCallback((path: string) => {
    setSelectedSectionPath(path);
    const mainContent = document.querySelector('main > div > div'); // Target the scrollable inner div
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300 font-inter">
      <ReadingProgress />
      <TopNavbar 
        sections={processedSections} 
        selectedSectionPath={selectedSectionPath}
        onSelectSection={handleSelectSection}
      />
      
      {/* Search Bar Container */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/70 px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <button
            onClick={() => setShowRawBillViewer(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 
                       text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/30 
                       transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Raw Bill Text
          </button>
        </div>
      </div>
      
      <main 
        className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 bg-gray-900 lg:pl-80" // Added left padding for TOC on desktop
      >
        <TableOfContents 
          sections={processedSections}
          currentPath={selectedSectionPath}
          onNavigate={handleSelectSection}
        />
        
        {/* Outer wrapper for card-like appearance and glow */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl shadow-2xl p-0.5 border border-sky-600/30 futuristic-glow-border h-full">
           {/* Inner container with actual content background and scrolling */}
          <div className="bg-slate-900/60 rounded-[10px] h-full overflow-y-auto"> 
            {selectedSection && (
              <div className="p-4 sm:p-6 md:p-8">
                <Breadcrumb 
                  sections={processedSections}
                  currentPath={selectedSectionPath}
                  onNavigate={handleSelectSection}
                />
              </div>
            )}
            <SectionContentDisplay 
                section={selectedSection} 
                aiClient={aiClient} 
                apiKeyMissing={apiKeyMissing}
                onSelectSection={handleSelectSection}
                searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>
      
      {/* Enhanced Bill Text Viewer Modal */}
      {showRawBillViewer && (
        <EnhancedBillTextViewer 
          onClose={() => setShowRawBillViewer(false)} 
          aiClient={aiClient}
        />
      )}
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { ProcessedReportSectionData } from '../types'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import ComparisonView from './ComparisonView';
import ComparisonTableDisplay from './ComparisonTableDisplay';
import AISummary from './AISummary';
import ComplianceDisplay from './ComplianceDisplay';
import CollapsibleBlock from './CollapsibleBlock'; 
import ShareButtons from './ShareButtons';
import ChevronRightIcon from './icons/ChevronRightIcon'; 
import FileTextIcon from './icons/FileTextIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import { highlightText } from '../utils/textHighlighter';

interface SectionContentDisplayProps {
  section: ProcessedReportSectionData | null;
  aiClient: GoogleGenerativeAI | null;
  apiKeyMissing: boolean;
  onSelectSection: (path: string) => void;
  searchQuery?: string;
}

const SectionContentDisplay: React.FC<SectionContentDisplayProps> = ({ section, aiClient, apiKeyMissing, onSelectSection, searchQuery = '' }) => {
  // States for collapsible blocks are managed internally by CollapsibleBlock now for direct sections.
  // We might need to manage openness for subsections if we want them all to open/close together.
  // For now, let's assume subsections' CollapsibleBlocks manage their own state triggered by initialOpen.

  const [areSubsectionsInitiallyOpen, setAreSubsectionsInitiallyOpen] = useState(true);

  useEffect(() => {
    // If the main section changes, we might want to reset subsection visibility or keep it as is.
    // For now, let's make them open by default when the main section loads.
    setAreSubsectionsInitiallyOpen(true);
  }, [section?.path]);


  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 md:p-10 text-center">
        <div className="p-8 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-2xl max-w-2xl w-full border border-sky-500/40">
          <FileTextIcon className="w-20 h-20 md:w-24 md:h-24 mb-8 text-sky-400 mx-auto futuristic-glow-text" />
          <h1 className="text-3xl md:text-4xl font-lexend font-bold text-sky-300 mb-5 futuristic-glow-text">Welcome to Clarity Act Nexus</h1>
          <p className="text-md md:text-lg text-slate-200 mb-4 max-w-lg mx-auto">
            Explore legislative texts with a futuristic interface. Navigate sections via the top bar.
          </p>
          <p className="mt-3 text-sm text-slate-400 max-w-lg mx-auto">
            Select a section to delve into detailed content, side-by-side bill comparisons, AI-generated insights, and compliance obligation breakdowns.
          </p>
        </div>
      </div>
    );
  }
  
  const renderRawContent = (content: string | string[] | undefined) => {
    if (!content) return null;
    if (Array.isArray(content)) {
      return (
        <div className="space-y-4 prose prose-base prose-slate prose-invert max-w-none prose-p:text-slate-200 prose-p:leading-relaxed prose-headings:text-sky-300">
          {content.map((paragraph, index) => (
            <p key={index}>{searchQuery ? highlightText(paragraph, searchQuery) : paragraph}</p>
          ))}
        </div>
      );
    }
    return <p className="text-slate-200 leading-relaxed prose prose-base prose-invert max-w-none">
      {searchQuery ? highlightText(content, searchQuery) : content}
    </p>;
  };

  const sectionTextContentForAI = Array.isArray(section.content) ? section.content.join('\n\n') : section.content;

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-2 border-sky-500/50 pb-5 mb-8">
        <h2 className="text-3xl lg:text-4xl font-lexend font-extrabold text-sky-300 futuristic-glow-text">
          {searchQuery ? highlightText(section.title, searchQuery) : section.title}
        </h2>
        <ShareButtons 
          sectionTitle={section.title}
          sectionPath={section.path}
          content={Array.isArray(section.content) ? section.content.join('\n\n') : section.content}
        />
      </div>

      {section.externalLegislationLinks && section.externalLegislationLinks.length > 0 && (
        <CollapsibleBlock title="Source Legislation Documents" initiallyOpen={true} idSuffix={`${section.id}-ext-links`} headerClassName="bg-sky-700/30 hover:bg-sky-600/40" contentClassName="border-sky-600/40">
          <ul className="space-y-3 pt-2">
            {section.externalLegislationLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-300 hover:text-cyan-200 hover:underline transition-colors duration-150 ease-in-out text-sm group focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-850 rounded-sm p-1"
                >
                  <ExternalLinkIcon className="w-4 h-4 mr-3 flex-shrink-0 text-cyan-400" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </CollapsibleBlock>
      )}
      
      {section.content && (
        <CollapsibleBlock title="Section Overview" initiallyOpen={true} idSuffix={`${section.id}-overview`}>
          {renderRawContent(section.content)}
          {aiClient && sectionTextContentForAI && (
            <AISummary aiClient={aiClient} textContent={sectionTextContentForAI} />
          )}
          {apiKeyMissing && !aiClient && sectionTextContentForAI && ( // only show if there was content for AI
             <div className="mt-4 p-3 bg-yellow-800/30 border border-yellow-700/50 rounded-md text-yellow-200 text-sm shadow-md">
                <p>AI features are disabled. API_KEY is missing or invalid.</p>
                <p className="text-xs mt-2">Check console for debug information.</p>
             </div>
          )}
        </CollapsibleBlock>
      )}

      {section.comparison && (
        <CollapsibleBlock title="Comparative Analysis" initiallyOpen={true} idSuffix={`${section.id}-comparison`}>
          <ComparisonView comparison={section.comparison} />
        </CollapsibleBlock>
      )}

      {section.tableData && section.tableData.length > 0 && (
         <CollapsibleBlock title="Detailed Comparison Table" initiallyOpen={true} idSuffix={`${section.id}-table`}>
          <ComparisonTableDisplay 
            tableData={section.tableData} 
            aiClient={aiClient}
            apiKeyMissing={apiKeyMissing}
          />
        </CollapsibleBlock>
      )}

      {section.complianceData && section.complianceData.length > 0 && (
        <CollapsibleBlock title="Detailed Compliance Obligations" initiallyOpen={true} idSuffix={`${section.id}-compliance`}>
          <ComplianceDisplay complianceData={section.complianceData} />
        </CollapsibleBlock>
      )}

      {section.relatedLinks && section.relatedLinks.length > 0 && (
        <CollapsibleBlock title="Related Links" initiallyOpen={true} idSuffix={`${section.id}-related`}>
          <ul className="space-y-2.5 pt-1">
            {section.relatedLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => onSelectSection(link.path)}
                  className="flex items-center text-sky-400 hover:text-sky-300 hover:underline transition-colors duration-150 ease-in-out text-sm group focus:outline-none focus:ring-1 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-850 rounded-sm p-0.5"
                >
                  <ChevronRightIcon className="w-4 h-4 mr-2 opacity-80 group-hover:opacity-100 transition-opacity" />
                  {link.linkText}
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleBlock>
      )}
      
      {section.subsections && section.subsections.length > 0 && (
        <div className="space-y-8 mt-10 pt-8 border-t-2 border-sky-500/50">
            <h3 className="text-2xl lg:text-3xl font-lexend font-semibold text-sky-400 mb-6 futuristic-glow-text">Subsections:</h3>
            {section.subsections.map(sub => (
                 <div key={sub.id} className="bg-slate-800/60 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-xl border border-sky-500/40">
                    <h4 
                        className="text-xl lg:text-2xl font-lexend font-semibold text-sky-300 mb-5 cursor-pointer hover:text-sky-200 transition-colors futuristic-glow-text inline-block"
                        onClick={() => onSelectSection(sub.path)}
                        title={`Go to ${sub.title}`}
                    >
                        {sub.title}
                    </h4>
                    
                    {(sub.content || sub.comparison || (sub.tableData && sub.tableData.length > 0) || (sub.complianceData && sub.complianceData.length > 0)) && (
                      <CollapsibleBlock title="View Details" initiallyOpen={areSubsectionsInitiallyOpen} idSuffix={`${sub.id}-subsection-details`}>
                        {sub.content && (
                            <div className="mb-4">{renderRawContent(sub.content)}</div>
                        )}
                        {aiClient && (Array.isArray(sub.content) ? sub.content.join('\n\n') : sub.content) && (
                            <AISummary aiClient={aiClient} textContent={Array.isArray(sub.content) ? sub.content.join('\n\n') : sub.content!} />
                        )}
                        {apiKeyMissing && !aiClient && (Array.isArray(sub.content) ? sub.content.join('\n\n') : sub.content) && (
                            <div className="mt-4 p-3 bg-yellow-800/30 border border-yellow-700/50 rounded-md text-yellow-200 text-sm shadow-md">
                                AI features for this subsection are disabled. API_KEY is missing.
                            </div>
                        )}
                        {sub.comparison && (
                            <div className="mt-4"><ComparisonView comparison={sub.comparison} /></div>
                        )}
                        {sub.tableData && sub.tableData.length > 0 && (
                            <div className="mt-4">
                                <ComparisonTableDisplay 
                                    tableData={sub.tableData} 
                                    aiClient={aiClient}
                                    apiKeyMissing={apiKeyMissing}
                                />
                            </div>
                        )}
                        {sub.complianceData && sub.complianceData.length > 0 && (
                            <div className="mt-4"><ComplianceDisplay complianceData={sub.complianceData} /></div>
                        )}
                      </CollapsibleBlock>
                    )}

                    {sub.relatedLinks && sub.relatedLinks.length > 0 && (
                       <CollapsibleBlock title="Related Links for this Subsection" initiallyOpen={true} className="mt-5" idSuffix={`${sub.id}-related-subsection`}>
                         <ul className="space-y-2.5 pt-1">
                            {sub.relatedLinks.map((link) => (
                            <li key={link.path}>
                                <button
                                onClick={() => onSelectSection(link.path)}
                                className="flex items-center text-sky-400 hover:text-sky-300 hover:underline transition-colors duration-150 ease-in-out text-sm group focus:outline-none focus:ring-1 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-850 rounded-sm p-0.5"
                                >
                                <ChevronRightIcon className="w-4 h-4 mr-2 opacity-80 group-hover:opacity-100 transition-opacity" />
                                {link.linkText}
                                </button>
                            </li>
                            ))}
                        </ul>
                       </CollapsibleBlock>
                    )}
                 </div>
            ))}
        </div>
      )}

    </div>
  );
};

export default SectionContentDisplay;
import React, { useState } from 'react';
import { ProcessedReportSectionData } from '../types';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface TableOfContentsProps {
  sections: ProcessedReportSectionData[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface TOCItemProps {
  section: ProcessedReportSectionData;
  currentPath: string;
  onNavigate: (path: string) => void;
  level: number;
}

const TOCItem: React.FC<TOCItemProps> = ({ section, currentPath, onNavigate, level }) => {
  const [isExpanded, setIsExpanded] = useState(currentPath.startsWith(section.path));
  const isActive = currentPath === section.path;
  const hasSubsections = section.subsections && section.subsections.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasSubsections && e.currentTarget === e.target) {
      setIsExpanded(!isExpanded);
    }
    onNavigate(section.path);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`w-full text-left flex items-center justify-between py-2 px-3 rounded-md text-sm transition-all duration-200
          ${isActive 
            ? 'bg-sky-500/20 text-sky-300 font-medium' 
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
      >
        <span className="truncate">{section.shortTitle || section.title}</span>
        {hasSubsections && (
          <span onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}>
            {isExpanded ? (
              <ChevronDownIcon className="w-3 h-3 ml-1 flex-shrink-0" />
            ) : (
              <ChevronRightIcon className="w-3 h-3 ml-1 flex-shrink-0" />
            )}
          </span>
        )}
      </button>
      
      {hasSubsections && isExpanded && (
        <ul className="mt-1">
          {section.subsections?.map(subSection => (
            <TOCItem
              key={subSection.path}
              section={subSection}
              currentPath={currentPath}
              onNavigate={onNavigate}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, currentPath, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating TOC Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 bottom-8 z-50 p-3 bg-slate-800/90 backdrop-blur-md rounded-full 
                   border border-sky-500/30 shadow-xl hover:shadow-sky-500/40 transition-all duration-300
                   md:hidden"
        aria-label="Toggle table of contents"
      >
        <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* TOC Sidebar - Desktop */}
      <aside className="hidden lg:block fixed left-8 top-32 w-72 max-h-[calc(100vh-10rem)] overflow-y-auto
                        bg-slate-800/50 backdrop-blur-md rounded-xl border border-sky-500/30 shadow-xl">
        <div className="p-4">
          <h3 className="text-lg font-lexend font-semibold text-sky-300 mb-4">Table of Contents</h3>
          <nav>
            <ul className="space-y-1">
              {sections.map(section => (
                <TOCItem
                  key={section.path}
                  section={section}
                  currentPath={currentPath}
                  onNavigate={onNavigate}
                  level={0}
                />
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* TOC Modal - Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl
                           border-r border-sky-500/30 shadow-2xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-lexend font-semibold text-sky-300">Table of Contents</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav>
                <ul className="space-y-1">
                  {sections.map(section => (
                    <TOCItem
                      key={section.path}
                      section={section}
                      currentPath={currentPath}
                      onNavigate={(path) => {
                        onNavigate(path);
                        setIsOpen(false);
                      }}
                      level={0}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default TableOfContents;
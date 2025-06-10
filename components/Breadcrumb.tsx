import React from 'react';
import { ProcessedReportSectionData } from '../types';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface BreadcrumbProps {
  sections: ProcessedReportSectionData[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ sections, currentPath, onNavigate }) => {
  const getBreadcrumbPath = (): ProcessedReportSectionData[] => {
    const path: ProcessedReportSectionData[] = [];
    const pathParts = currentPath.split('/');
    
    let currentSections = sections;
    let builtPath = '';
    
    for (const part of pathParts) {
      builtPath = builtPath ? `${builtPath}/${part}` : part;
      const section = currentSections.find(s => s.path === builtPath);
      
      if (section) {
        path.push(section);
        if (section.subsections) {
          currentSections = section.subsections;
        }
      }
    }
    
    return path;
  };

  const breadcrumbPath = getBreadcrumbPath();

  if (breadcrumbPath.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm flex-wrap">
        <li>
          <button
            onClick={() => onNavigate(sections[0].path)}
            className="text-slate-400 hover:text-sky-300 transition-colors"
            aria-label="Go to home"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </li>
        {breadcrumbPath.map((section, index) => (
          <React.Fragment key={section.path}>
            <li className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 text-slate-600 mx-1" />
              {index === breadcrumbPath.length - 1 ? (
                <span className="text-sky-300 font-medium" aria-current="page">
                  {section.shortTitle || section.title}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(section.path)}
                  className="text-slate-400 hover:text-sky-300 transition-colors"
                >
                  {section.shortTitle || section.title}
                </button>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
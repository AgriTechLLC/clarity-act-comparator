import React, { useState, useEffect } from 'react';

interface CitationTooltipProps {
  citation: string;
  children: React.ReactNode;
}

interface CitationInfo {
  fullName: string;
  description: string;
  url?: string;
}

const CitationTooltip: React.FC<CitationTooltipProps> = ({ citation, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [citationInfo, setCitationInfo] = useState<CitationInfo | null>(null);

  useEffect(() => {
    if (showTooltip) {
      setCitationInfo(resolveCitation(citation));
    }
  }, [showTooltip, citation]);

  const resolveCitation = (cite: string): CitationInfo => {
    // Common U.S. Code sections
    if (cite.includes('15 U.S.C. 78')) {
      return {
        fullName: 'Securities Exchange Act of 1934',
        description: 'Federal law governing the secondary trading of securities',
        url: 'https://www.law.cornell.edu/uscode/text/15/chapter-2B'
      };
    }
    
    if (cite.includes('7 U.S.C.')) {
      return {
        fullName: 'Commodity Exchange Act',
        description: 'Federal law regulating commodity futures and derivatives markets',
        url: 'https://www.law.cornell.edu/uscode/text/7/chapter-1'
      };
    }
    
    if (cite.includes('Section 10(b)')) {
      return {
        fullName: 'Securities Exchange Act Section 10(b)',
        description: 'Prohibits fraud and manipulation in securities trading',
        url: 'https://www.law.cornell.edu/uscode/text/15/78j'
      };
    }
    
    if (cite.includes('17 C.F.R.')) {
      return {
        fullName: 'Code of Federal Regulations - Commodity and Securities Exchanges',
        description: 'SEC and CFTC regulations',
        url: 'https://www.ecfr.gov/current/title-17'
      };
    }
    
    // Default response
    return {
      fullName: cite,
      description: 'Legal citation - click to search for more information',
      url: `https://www.google.com/search?q=${encodeURIComponent(cite + ' legal definition')}`
    };
  };

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help"
      >
        {children}
      </span>
      
      {showTooltip && citationInfo && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 rounded-lg shadow-xl border border-sky-500/30">
          <div className="text-sm">
            <div className="font-semibold text-sky-300 mb-1">{citationInfo.fullName}</div>
            <div className="text-slate-300 text-xs mb-2">{citationInfo.description}</div>
            {citationInfo.url && (
              <a
                href={citationInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 text-xs flex items-center gap-1"
              >
                Learn more
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
          </div>
        </div>
      )}
    </span>
  );
};

export default CitationTooltip;
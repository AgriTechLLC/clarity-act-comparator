import React, { useState, useEffect } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CollapsibleBlockProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  idSuffix: string;
}

const CollapsibleBlock: React.FC<CollapsibleBlockProps> = ({
  title,
  children,
  initiallyOpen = false,
  className = '',
  headerClassName = 'bg-slate-800/70 hover:bg-slate-700/80', // Default futuristic header
  contentClassName = '',
  idSuffix,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  
  useEffect(() => {
    setIsOpen(initiallyOpen);
  }, [initiallyOpen]);

  const headerId = `collapsible-header-${idSuffix}`;
  const contentId = `collapsible-content-${idSuffix}`;

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-sky-500/30 ${className} futuristic-glow-border`}>
      <h3
        id={headerId}
        className={`flex items-center justify-between p-4 sm:p-5 cursor-pointer 
                    ${isOpen ? 'border-b border-sky-500/50' : ''} 
                    rounded-t-lg 
                    focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-850 
                    transition-all duration-200 ease-in-out group ${headerClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen);}}
      >
        <span className="text-lg sm:text-xl font-lexend font-semibold text-sky-300 group-hover:text-sky-200 transition-colors futuristic-glow-text">{title}</span>
        {isOpen ? (
          <ChevronDownIcon className="w-5 h-5 text-sky-400 transition-transform duration-300 transform rotate-0" />
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-slate-400 transition-transform duration-300 transform group-hover:text-sky-400" />
        )}
      </h3>
      <div 
        id={contentId}
        className={`collapsible-content ${isOpen ? 'open' : ''} ${contentClassName}`}
        role="region" 
        aria-labelledby={headerId}
      >
        <div className="p-4 sm:p-6 border-t border-sky-500/30"> {/* Content padding + top border when open */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleBlock;
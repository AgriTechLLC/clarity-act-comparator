import React, { useState, useRef, useEffect } from 'react';
import { ProcessedReportSectionData } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface TopNavbarProps {
  sections: ProcessedReportSectionData[];
  selectedSectionPath: string | null;
  onSelectSection: (path: string) => void;
}

const NavItem: React.FC<{
  section: ProcessedReportSectionData;
  selectedSectionPath: string | null;
  onSelectSection: (path: string) => void;
  isTopLevel?: boolean;
}> = ({ section, selectedSectionPath, onSelectSection, isTopLevel = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isActive = selectedSectionPath === section.path || 
                   (selectedSectionPath?.startsWith(section.path + '/') && isTopLevel && section.subsections && section.subsections.length > 0);

  const hasSubsections = section.subsections && section.subsections.length > 0;
  const itemRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleSelect = () => {
    onSelectSection(section.path);
    setIsDropdownOpen(false); // Close dropdown on main item click
  };
  
  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearExistingTimeout();
    if (hasSubsections && isTopLevel) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    clearExistingTimeout();
    if (hasSubsections && isTopLevel) {
      timeoutRef.current = window.setTimeout(() => {
        setIsDropdownOpen(false);
      }, 200);
    }
  };
  
  const handleFocusWithin = () => {
    clearExistingTimeout();
    if (hasSubsections && isTopLevel) {
      setIsDropdownOpen(true);
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      itemRef.current?.querySelector('button')?.focus();
    }
  };
  
  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hasSubsections && isTopLevel) {
        setIsDropdownOpen(prev => !prev);
      } else {
        handleSelect();
      }
    } else if (e.key === 'ArrowDown' && hasSubsections && isDropdownOpen && isTopLevel) {
        e.preventDefault();
        const firstDropdownItem = itemRef.current?.querySelector('ul > li > button') as HTMLElement | null;
        firstDropdownItem?.focus();
    } else if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearExistingTimeout();
    };
  }, [isDropdownOpen]);

  const baseClasses = `px-4 py-3 rounded-lg text-sm font-lexend font-semibold cursor-pointer transition-all duration-200 ease-in-out 
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`;
  const activeClasses = `bg-sky-500/90 text-white shadow-lg shadow-sky-500/30 futuristic-glow-text`;
  const inactiveClasses = `text-slate-200 hover:bg-slate-700/70 hover:text-sky-300`;
  
  const dropdownItemClasses = `block w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-sky-600/60 hover:text-white 
                               transition-colors duration-150 rounded-md focus:outline-none focus:bg-sky-600/60 focus:text-white`;
  const activeDropdownItemClasses = `bg-sky-500/80 text-white font-medium`;

  if (!isTopLevel) {
    return (
       <li>
        <button 
            onClick={handleSelect}
            onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleSelect(); }}
            className={`${dropdownItemClasses} ${selectedSectionPath === section.path ? activeDropdownItemClasses : ''}`}
            role="menuitem"
        >
          {section.shortTitle || section.title}
        </button>
      </li>
    );
  }

  return (
    <li 
        className="relative group" 
        ref={itemRef} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocusWithin} // Catches focus moving into the item or its children
    >
      <button
        onClick={hasSubsections ? () => setIsDropdownOpen(prev => !prev) : handleSelect}
        onKeyDown={handleItemKeyDown}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} flex items-center`}
        aria-haspopup={hasSubsections ? "true" : "false"}
        aria-expanded={isDropdownOpen}
      >
        {section.shortTitle || section.title}
        {hasSubsections && <ChevronDownIcon className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />}
      </button>
      {isDropdownOpen && hasSubsections && (
        <ul 
            className="absolute left-0 mt-2 w-72 origin-top-left bg-slate-800/90 backdrop-blur-lg shadow-2xl rounded-xl py-2.5 
                       border border-sky-500/40 futuristic-glow-border ring-1 ring-black ring-opacity-10 focus:outline-none z-50"
            role="menu"
            onKeyDown={handleDropdownKeyDown}
            onMouseLeave={handleMouseLeave} // Ensure dropdown closes if mouse leaves it
            onMouseEnter={handleMouseEnter} // Keep it open if mouse re-enters
        >
          {section.subsections?.map(subSection => (
            <NavItem 
              key={subSection.path} 
              section={subSection} 
              selectedSectionPath={selectedSectionPath} 
              onSelectSection={onSelectSection} 
              isTopLevel={false} 
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const MobileNavItem: React.FC<{
  section: ProcessedReportSectionData;
  selectedSectionPath: string | null;
  onSelectSection: (path: string) => void;
  level: number;
}> = ({ section, selectedSectionPath, onSelectSection, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = selectedSectionPath === section.path;
  const hasSubsections = section.subsections && section.subsections.length > 0;
  
  const handleToggle = () => {
    if (hasSubsections) {
      setIsExpanded(prev => !prev);
    } else {
      onSelectSection(section.path);
    }
  };

  const paddingLeft = `${level * 1.5 + 1}rem`;

  return (
    <li>
      <button
        onClick={handleToggle}
        className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
          ${isActive 
            ? 'bg-sky-500/90 text-white shadow-lg shadow-sky-500/30' 
            : 'text-slate-200 hover:bg-slate-700/70 hover:text-sky-300'
          }`}
        style={{ paddingLeft }}
      >
        <span>{section.shortTitle || section.title}</span>
        {hasSubsections && (
          <ChevronDownIcon 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} 
          />
        )}
      </button>
      
      {hasSubsections && isExpanded && (
        <ul className="mt-1 space-y-1">
          {section.subsections?.map(subSection => (
            <MobileNavItem
              key={subSection.path}
              section={subSection}
              selectedSectionPath={selectedSectionPath}
              onSelectSection={onSelectSection}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TopNavbar: React.FC<TopNavbarProps> = ({ sections, selectedSectionPath, onSelectSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleMobileMenuSelect = (path: string) => {
    onSelectSection(path);
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl shadow-2xl border-b border-slate-700/70 sticky top-0 z-[1000]"> {/* High z-index */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="font-lexend text-xl sm:text-2xl lg:text-3xl font-bold text-sky-400 futuristic-glow-text">Clarity Act Nexus</span>
          </div>
          <div className="hidden md:block">
            <ul className="ml-4 flex items-center space-x-2 lg:space-x-3">
              {sections.map((section) => (
                <NavItem 
                    key={section.path} 
                    section={section} 
                    selectedSectionPath={selectedSectionPath} 
                    onSelectSection={onSelectSection}
                    isTopLevel={true}
                />
              ))}
            </ul>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-lg text-slate-200 hover:bg-slate-700/70 hover:text-sky-300 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-700/70 z-[999]"
        >
          <nav className="px-4 py-4">
            <ul className="space-y-2">
              {sections.map((section) => (
                <MobileNavItem
                  key={section.path}
                  section={section}
                  selectedSectionPath={selectedSectionPath}
                  onSelectSection={handleMobileMenuSelect}
                  level={0}
                />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
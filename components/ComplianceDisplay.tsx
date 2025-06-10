import React from 'react';
import { ComplianceItem } from '../types';

interface ComplianceDisplayProps {
  complianceData: ComplianceItem[];
}

const getRegulatoryFocusClasses = (focus: ComplianceItem['keyRegulatoryFocus']): { border: string; text: string; bg: string; hoverBg: string, tagText: string; tagBg: string; glowClass: string;} => {
  switch (focus) {
    case 'SEC':
      return { border: 'border-sky-500/60', text: 'text-sky-300', bg: 'bg-sky-900/40', hoverBg: 'hover:bg-sky-800/50', tagText: 'text-sky-100', tagBg: 'bg-sky-600/90', glowClass: 'hover:shadow-sky-500/40' };
    case 'CFTC':
      return { border: 'border-amber-500/60', text: 'text-amber-300', bg: 'bg-amber-900/40', hoverBg: 'hover:bg-amber-800/50', tagText: 'text-amber-100', tagBg: 'bg-amber-600/90', glowClass: 'hover:shadow-amber-500/40' };
    case 'Both':
      return { border: 'border-purple-500/60', text: 'text-purple-300', bg: 'bg-purple-900/40', hoverBg: 'hover:bg-purple-800/50', tagText: 'text-purple-100', tagBg: 'bg-purple-600/90', glowClass: 'hover:shadow-purple-500/40' };
    case 'FINCEN':
      return { border: 'border-emerald-500/60', text: 'text-emerald-300', bg: 'bg-emerald-900/40', hoverBg: 'hover:bg-emerald-800/50', tagText: 'text-emerald-100', tagBg: 'bg-emerald-600/90', glowClass: 'hover:shadow-emerald-500/40' };
    case 'Federal Banking Regulator':
      return { border: 'border-blue-500/60', text: 'text-blue-300', bg: 'bg-blue-900/40', hoverBg: 'hover:bg-blue-800/50', tagText: 'text-blue-100', tagBg: 'bg-blue-600/90', glowClass: 'hover:shadow-blue-500/40' };
    case 'State Regulator':
        return { border: 'border-indigo-500/60', text: 'text-indigo-300', bg: 'bg-indigo-900/40', hoverBg: 'hover:bg-indigo-800/50', tagText: 'text-indigo-100', tagBg: 'bg-indigo-600/90', glowClass: 'hover:shadow-indigo-500/40' };
    default:
      return { border: 'border-slate-600/60', text: 'text-slate-300', bg: 'bg-slate-700/40', hoverBg: 'hover:bg-slate-700/60', tagText: 'text-slate-100', tagBg: 'bg-slate-600/90', glowClass: 'hover:shadow-slate-500/40' };
  }
};

const renderTextContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-200 pl-1">
          {content.map((item, index) => (
            <li key={index} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm text-slate-200 leading-relaxed">{content}</p>;
  };

const ComplianceDisplay: React.FC<ComplianceDisplayProps> = ({ complianceData }) => {
  if (!complianceData || complianceData.length === 0) {
    return <p className="text-slate-400 italic">No specific compliance data available for this section.</p>;
  }

  return (
    <div className="space-y-8">
      {complianceData.map((item) => {
        const focusClasses = getRegulatoryFocusClasses(item.keyRegulatoryFocus);
        return (
            <div key={item.requirementId} 
                 className={`bg-slate-800/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border ${focusClasses.border} 
                             transition-all duration-300 ease-in-out ${focusClasses.hoverBg} ${focusClasses.glowClass} futuristic-glow-border
                             hover:border-opacity-100 hover:shadow-lg`}>
            <h4 className={`text-xl font-lexend font-semibold ${focusClasses.text} mb-4 pb-3 border-b border-slate-700/70 futuristic-glow-text`}>{item.requirementTitle}</h4>
            
            <div className="mb-5">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h5>
              {renderTextContent(item.description)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5 text-sm">
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Responsible Entities</h5>
                <ul className="list-none space-y-1.5 text-slate-200 pl-0">
                  {item.responsibleEntities.map(entity => <li key={entity} className="before:content-['▹'] before:mr-2.5 before:text-sky-400">{entity}</li>)}
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Regulatory Focus</h5>
                <span className={`inline-block px-3.5 py-1.5 text-xs font-semibold rounded-full ${focusClasses.tagBg} ${focusClasses.tagText} shadow-md border border-opacity-30 ${focusClasses.border}`}>
                  {item.keyRegulatoryFocus}
                </span>
              </div>
            </div>
            
            <div className="mb-5">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Penalties Summary</h5>
              <p className="text-sm text-slate-200 leading-relaxed">{item.penaltiesSummary}</p>
            </div>

            {item.sourceSections && (
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Source Sections (Illustrative)</h5>
                <p className="text-xs text-slate-400 italic">{item.sourceSections}</p>
              </div>
            )}

            {item.notes && (
              <div className="mt-5 pt-4 border-t border-slate-700/70">
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes</h5>
                <p className="text-xs text-slate-400 italic leading-relaxed">{item.notes}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ComplianceDisplay;
import React, { useState } from 'react';
import { ComparisonTableRow } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import TableRowAISummary from './TableRowAISummary';
import SparklesIcon from './icons/SparklesIcon';
import Loading from './Loading';


interface ComparisonTableDisplayProps {
  tableData: ComparisonTableRow[];
  aiClient: GoogleGenerativeAI | null;
  apiKeyMissing: boolean;
}

const renderCellContent = (content: string | string[] | undefined) => {
    if (!content) return <span className="text-slate-500 italic text-xs">N/A</span>;
    
    const contentArray = Array.isArray(content) ? content : [content];
    
    return (
      <div className="space-y-1.5 text-sm text-slate-200 leading-relaxed"> {/* Increased font size and line height */}
        {contentArray.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  };

type VisibleColumns = {
  originalSummary: boolean;
  hfscAnalysis: boolean;
  hagAnalysis: boolean;
  keyDifferencesHfscVsHag: boolean;
};

const ComparisonTableDisplay: React.FC<ComparisonTableDisplayProps> = ({ tableData, aiClient, apiKeyMissing }) => {
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    originalSummary: true,
    hfscAnalysis: true,
    hagAnalysis: true,
    keyDifferencesHfscVsHag: true,
  });
  const [expandedAiRowId, setExpandedAiRowId] = useState<string | null>(null);


  if (!tableData || tableData.length === 0) {
    return <p className="text-slate-400 italic">No table data available for this section.</p>;
  }

  const toggleColumn = (columnName: keyof VisibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [columnName]: !prev[columnName] }));
  };

  const handleToggleAiSummary = (rowId: string) => {
    setExpandedAiRowId(prevId => (prevId === rowId ? null : rowId));
  };
  
  const totalVisibleColumns = Object.values(visibleColumns).filter(Boolean).length;
  const provisionColSpan = 1; // For the 'Provision / Section' column
  const actionColSpan = 1; // For the 'AI Insights' column
  const totalColumns = provisionColSpan + totalVisibleColumns + actionColSpan;


  const columnConfig: Array<{ key: keyof VisibleColumns; label: string; headerClass?: string; minWidth?: string }> = [
    { key: 'originalSummary', label: 'Original Bill Summary', headerClass: 'text-sky-300', minWidth: 'min-w-[250px]'},
    { key: 'hfscAnalysis', label: 'HFSC ANS Changes & Analysis', headerClass: 'text-sky-300', minWidth: 'min-w-[250px]' },
    { key: 'hagAnalysis', label: 'HAG ANS Changes & Analysis', headerClass: 'text-sky-300', minWidth: 'min-w-[250px]' },
    { key: 'keyDifferencesHfscVsHag', label: 'Key Differences (HFSC vs. HAG)', headerClass: 'text-emerald-300', minWidth: 'min-w-[250px]' },
  ];


  return (
    <>
      <div className="mb-6 p-4 bg-slate-700/60 backdrop-blur-sm rounded-lg border border-sky-500/40 shadow-xl">
        <p className="text-sm font-semibold text-sky-300 mb-3 futuristic-glow-text">Toggle Column Visibility:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-2.5 items-center">
          {columnConfig.map(col => (
            <label key={col.key} className="flex items-center space-x-2.5 cursor-pointer group p-1.5 rounded-md hover:bg-slate-600/70 transition-colors">
              <input 
                type="checkbox" 
                checked={visibleColumns[col.key]} 
                onChange={() => toggleColumn(col.key)} 
                className="h-4 w-4 accent-cyan-500 bg-slate-600 border-slate-500 rounded-sm 
                           text-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-700
                           transition-all duration-150 ease-in-out transform group-hover:scale-110"
              />
              <span className="text-xs text-slate-200 group-hover:text-cyan-300 transition-colors">{col.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto bg-slate-800/70 backdrop-blur-md rounded-lg shadow-2xl border border-sky-500/40 futuristic-glow-border">
        <table className="min-w-full divide-y divide-slate-700/70 table-auto w-full">
          <thead className="bg-slate-700/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th scope="col" className="px-5 py-4 text-left text-xs font-semibold text-sky-200 uppercase tracking-wider w-[280px] min-w-[280px]">Provision / Section</th>
              {columnConfig.map(col => visibleColumns[col.key] && (
                <th key={col.key} scope="col" className={`px-5 py-4 text-left text-xs font-semibold ${col.headerClass || 'text-sky-200'} uppercase tracking-wider ${col.minWidth || 'min-w-[240px]'}`}>
                  {col.label}
                </th>
              ))}
              <th scope="col" className="px-5 py-4 text-left text-xs font-semibold text-sky-200 uppercase tracking-wider min-w-[120px]">AI Insights</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60">
            {tableData.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr 
                  className={`transition-colors duration-150 ease-in-out ${index % 2 === 0 ? 'bg-slate-800/60' : 'bg-slate-850/50'} hover:bg-slate-700/80`}
                >
                  <td className="whitespace-normal px-5 py-4 align-top font-medium text-slate-100 text-sm">{row.provision}</td>
                  {visibleColumns.originalSummary && <td className="whitespace-normal px-5 py-4 align-top">{renderCellContent(row.originalSummary)}</td>}
                  {visibleColumns.hfscAnalysis && <td className="whitespace-normal px-5 py-4 align-top">{renderCellContent(row.hfscAnalysis)}</td>}
                  {visibleColumns.hagAnalysis && <td className="whitespace-normal px-5 py-4 align-top">{renderCellContent(row.hagAnalysis)}</td>}
                  {visibleColumns.keyDifferencesHfscVsHag && <td className="whitespace-normal px-5 py-4 align-top">{renderCellContent(row.keyDifferencesHfscVsHag)}</td>}
                  <td className="whitespace-normal px-5 py-4 align-top">
                    {aiClient && (
                      <TableRowAISummary
                        rowData={row}
                        aiClient={aiClient}
                        apiKeyMissing={apiKeyMissing}
                        isExpanded={expandedAiRowId === row.id}
                        onToggle={() => handleToggleAiSummary(row.id)}
                      />
                    )}
                    {apiKeyMissing && !aiClient && (
                         <span className="text-yellow-400 text-xs italic">AI N/A</span>
                    )}
                  </td>
                </tr>
                {expandedAiRowId === row.id && (
                   <tr className={`${index % 2 === 0 ? 'bg-slate-800/60' : 'bg-slate-850/50'} border-l-4 border-sky-500`}>
                    <td colSpan={totalColumns} className="px-5 py-4">
                        <TableRowAISummary // Render the content part here
                            rowData={row}
                            aiClient={aiClient!} // aiClient must exist if expanded
                            apiKeyMissing={apiKeyMissing}
                            isExpanded={true}
                            onToggle={() => handleToggleAiSummary(row.id)}
                            displayOnlyContent={true} // New prop to only show content
                        />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ComparisonTableDisplay;
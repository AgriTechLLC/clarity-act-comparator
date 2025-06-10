import { diffLines } from 'diff';

export interface ExportOptions {
  format: 'pdf' | 'html' | 'markdown';
  includeHighlights: boolean;
  includeLineNumbers: boolean;
}

export class BillExporter {
  static exportComparison(
    originalText: string,
    comparedText: string,
    originalLabel: string,
    comparedLabel: string,
    options: ExportOptions
  ): string {
    const differences = diffLines(originalText, comparedText);
    
    switch (options.format) {
      case 'html':
        return this.generateHTML(differences, originalLabel, comparedLabel, options);
      case 'markdown':
        return this.generateMarkdown(differences, originalLabel, comparedLabel, options);
      default:
        return this.generateHTML(differences, originalLabel, comparedLabel, options);
    }
  }

  private static generateHTML(
    differences: any[],
    originalLabel: string,
    comparedLabel: string,
    options: ExportOptions
  ): string {
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bill Comparison: ${originalLabel} vs ${comparedLabel}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: #1e293b;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .comparison-container {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 6px;
    }
    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .additions { color: #10b981; font-weight: 600; }
    .deletions { color: #ef4444; font-weight: 600; }
    .unchanged { color: #6b7280; }
    .diff-line {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.5;
      padding: 2px 0;
    }
    .line-number {
      display: inline-block;
      width: 50px;
      text-align: right;
      padding-right: 10px;
      color: #9ca3af;
      user-select: none;
    }
    .added {
      background-color: #d1fae5;
      color: #065f46;
    }
    .removed {
      background-color: #fee2e2;
      color: #991b1b;
    }
    @media print {
      body { background: white; }
      .header { color: black; border: 1px solid #000; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Legislative Text Comparison</h1>
    <p>${originalLabel} → ${comparedLabel}</p>
    <p>Generated on ${new Date().toLocaleDateString()}</p>
  </div>
`;

    // Calculate statistics
    let additions = 0, deletions = 0, unchanged = 0;
    differences.forEach(part => {
      const lines = part.value.split('\n').filter(line => line.length > 0).length;
      if (part.added) additions += lines;
      else if (part.removed) deletions += lines;
      else unchanged += lines;
    });

    html += `
  <div class="comparison-container">
    <div class="stats">
      <div class="stat additions">+${additions} additions</div>
      <div class="stat deletions">-${deletions} deletions</div>
      <div class="stat unchanged">${unchanged} unchanged</div>
    </div>
    <div class="diff-content">
`;

    let lineNum = 1;
    differences.forEach(part => {
      const lines = part.value.split('\n');
      lines.forEach((line, idx) => {
        if (idx === lines.length - 1 && !line) return; // Skip last empty line
        
        let className = '';
        let prefix = '';
        if (part.added) {
          className = 'added';
          prefix = '+ ';
        } else if (part.removed) {
          className = 'removed';
          prefix = '- ';
        } else {
          prefix = '  ';
        }
        
        html += `      <div class="diff-line ${className}">`;
        if (options.includeLineNumbers && !part.removed) {
          html += `<span class="line-number">${lineNum++}</span>`;
        } else if (options.includeLineNumbers) {
          html += `<span class="line-number"></span>`;
        }
        html += `${prefix}${this.escapeHtml(line)}</div>\n`;
      });
    });

    html += `
    </div>
  </div>
</body>
</html>`;

    return html;
  }

  private static generateMarkdown(
    differences: any[],
    originalLabel: string,
    comparedLabel: string,
    options: ExportOptions
  ): string {
    let markdown = `# Legislative Text Comparison

**${originalLabel}** → **${comparedLabel}**  
Generated on ${new Date().toLocaleDateString()}

## Summary

`;

    // Calculate statistics
    let additions = 0, deletions = 0, unchanged = 0;
    differences.forEach(part => {
      const lines = part.value.split('\n').filter(line => line.length > 0).length;
      if (part.added) additions += lines;
      else if (part.removed) deletions += lines;
      else unchanged += lines;
    });

    markdown += `- **Additions:** +${additions} lines\n`;
    markdown += `- **Deletions:** -${deletions} lines\n`;
    markdown += `- **Unchanged:** ${unchanged} lines\n\n`;

    markdown += `## Differences\n\n\`\`\`diff\n`;

    differences.forEach(part => {
      const lines = part.value.split('\n');
      lines.forEach((line, idx) => {
        if (idx === lines.length - 1 && !line) return;
        
        if (part.added) {
          markdown += `+ ${line}\n`;
        } else if (part.removed) {
          markdown += `- ${line}\n`;
        } else {
          markdown += `  ${line}\n`;
        }
      });
    });

    markdown += `\`\`\`\n`;

    return markdown;
  }

  private static escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
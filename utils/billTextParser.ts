export interface BillSection {
  sectionNumber: string;
  title: string;
  content: string;
  lineStart: number;
  lineEnd: number;
  level: number; // 0 for TITLE, 1 for SEC, 2 for subsections
  type: 'title' | 'section' | 'subsection';
  subsections?: BillSection[];
  citations?: string[]; // Legal citations found in this section
}

export interface ParsedBill {
  title: string;
  version: 'original' | 'hfsc' | 'hag';
  date: string;
  sections: BillSection[];
  rawText: string;
}

export class BillTextParser {
  private lines: string[];
  
  constructor(private rawText: string) {
    this.lines = rawText.split('\n');
  }

  parse(): ParsedBill {
    const version = this.detectVersion();
    const date = this.extractDate();
    const title = this.extractTitle();
    const sections = this.extractSections();

    return {
      title,
      version,
      date,
      sections,
      rawText: this.rawText
    };
  }

  private detectVersion(): 'original' | 'hfsc' | 'hag' {
    const text = this.rawText.toLowerCase();
    if (text.includes('clarity_ans_ag.xml')) return 'hag';
    if (text.includes('clarity_ans_fsc.xml')) return 'hfsc';
    return 'original';
  }

  private extractDate(): string {
    const dateMatch = this.rawText.match(/(\w+ \d+, \d{4}) \([\d:]+ [ap]\.m\.\)/);
    return dateMatch ? dateMatch[1] : '';
  }

  private extractTitle(): string {
    const titleMatch = this.rawText.match(/may be cited as the\s+"([^"]+)"/);
    return titleMatch ? titleMatch[1] : 'Digital Asset Market Clarity Act of 2025';
  }

  private extractSections(): BillSection[] {
    const sections: BillSection[] = [];
    let currentTitle: BillSection | null = null;

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i].trim();
      
      // Skip empty lines and metadata
      if (!line || line.match(/^VerDate|^g:\\|^\d+$/)) continue;
      
      // Check for TITLE (more flexible pattern)
      const titleMatch = line.match(/^TITLE\s+([IVXLCDM]+)\s*[—–-]\s*(.+)$/i);
      if (titleMatch) {
        currentTitle = {
          sectionNumber: `TITLE ${titleMatch[1]}`,
          title: titleMatch[2].trim().replace(/\.$/, ''),
          content: '',
          lineStart: i + 1,
          lineEnd: i + 1,
          level: 0,
          type: 'title',
          subsections: [],
          citations: []
        };
        sections.push(currentTitle);
        continue;
      }

      // Check for SEC./SECTION (more flexible pattern)
      const sectionMatch = line.match(/^(?:\d+\s+)?(?:SEC|SECTION)\.?\s*(\d+)\.?\s*(.+?)\.?$/i);
      if (sectionMatch) {
        const section: BillSection = {
          sectionNumber: `SEC. ${sectionMatch[1]}`,
          title: sectionMatch[2].trim().replace(/\.$/, ''),
          content: this.extractSectionContent(i),
          lineStart: i + 1,
          lineEnd: this.findSectionEnd(i),
          level: 1,
          type: 'section',
          subsections: [],
          citations: this.extractCitationsFromRange(i, this.findSectionEnd(i))
        };

        if (currentTitle && currentTitle.subsections) {
          currentTitle.subsections.push(section);
        } else {
          sections.push(section);
        }
      }
    }

    return sections;
  }
  
  private extractCitationsFromRange(startLine: number, endLine: number): string[] {
    const citations: string[] = [];
    for (let i = startLine; i < endLine && i < this.lines.length; i++) {
      const lineCitations = this.extractCitations(this.lines[i]);
      citations.push(...lineCitations);
    }
    return [...new Set(citations)]; // Remove duplicates
  }
  
  private extractCitations(text: string): string[] {
    const citations: string[] = [];
    
    // Pattern for section references
    const patterns = [
      /(?:Section|Sec\.?)\s+\d+(?:\([a-z]\))?(?:\(\d+\))?/gi,
      /\d+\s+U\.S\.C\.?\s+\d+[a-z]?(?:\([a-z]\))?/gi,
      /\d+\s+C\.F\.R\.?\s+(?:Part\s+)?\d+\.?\d*/gi,
      /(?:Securities\s+)?(?:Exchange\s+)?Act\s+of\s+\d{4}/gi,
      /Commodity\s+Exchange\s+Act/gi
    ];
    
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        citations.push(...matches);
      }
    });
    
    return citations;
  }

  private extractSectionContent(startLine: number): string {
    const contentLines: string[] = [];
    let i = startLine + 1;
    
    while (i < this.lines.length) {
      const line = this.lines[i];
      
      // Stop if we hit another section or title
      if (line.match(/^(\d+\s+)?(SEC|SECTION)\.\s*\d+\./) || 
          line.match(/^TITLE\s+[IVXLCDM]+[—–]/)) {
        break;
      }
      
      // Skip page headers/footers
      if (!line.match(/^(VerDate|g:\\)/)) {
        contentLines.push(line);
      }
      
      i++;
    }
    
    return contentLines.join('\n').trim();
  }

  private findSectionEnd(startLine: number): number {
    let i = startLine + 1;
    
    while (i < this.lines.length) {
      const line = this.lines[i];
      
      if (line.match(/^(\d+\s+)?(SEC|SECTION)\.\s*\d+\./) || 
          line.match(/^TITLE\s+[IVXLCDM]+[—–]/)) {
        return i;
      }
      
      i++;
    }
    
    return this.lines.length;
  }

  searchInBill(query: string): Array<{lineNumber: number; text: string; section: string}> {
    const results: Array<{lineNumber: number; text: string; section: string}> = [];
    const queryLower = query.toLowerCase();
    let currentSection = '';

    this.lines.forEach((line, index) => {
      // Update current section
      const sectionMatch = line.match(/^(\d+\s+)?(SEC|SECTION)\.\s*(\d+)\.\s*(.+?)\.?$/);
      if (sectionMatch) {
        currentSection = `Section ${sectionMatch[3]}: ${sectionMatch[4]}`;
      }

      // Search for query
      if (line.toLowerCase().includes(queryLower)) {
        results.push({
          lineNumber: index + 1,
          text: line.trim(),
          section: currentSection
        });
      }
    });

    return results;
  }
}
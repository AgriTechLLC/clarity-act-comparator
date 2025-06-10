export class BillTextNormalizer {
  /**
   * Normalizes bill text for comparison by removing formatting artifacts,
   * page numbers, and other non-substantive differences
   */
  static normalizeBillText(text: string): string {
    let normalized = text;
    
    // Remove file metadata lines (like VerDate, file paths, etc.)
    normalized = normalized.replace(/^VerDate.*$/gm, '');
    normalized = normalized.replace(/^g:\\.*$/gm, '');
    normalized = normalized.replace(/^[A-Z]:\\.*$/gm, '');
    normalized = normalized.replace(/^\d+:\d+\s+[ap]\.m\..*$/gm, '');
    
    // Remove page numbers and formatting marks
    normalized = normalized.replace(/^\d+$/gm, ''); // Standalone numbers (page numbers)
    normalized = normalized.replace(/^\.{5,}$/gm, ''); // Lines of dots
    
    // Remove date/time stamps
    normalized = normalized.replace(/\b\d{1,2}:\d{2}\s+(?:a\.m\.|p\.m\.|am|pm)\b/gi, '');
    normalized = normalized.replace(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/gi, '');
    
    // Normalize whitespace
    normalized = normalized.replace(/\t/g, ' '); // Replace tabs with spaces
    normalized = normalized.replace(/ +/g, ' '); // Multiple spaces to single space
    normalized = normalized.replace(/\r\n/g, '\n'); // Windows to Unix line endings
    normalized = normalized.replace(/\r/g, '\n'); // Old Mac to Unix line endings
    
    // Remove empty lines and trim each line
    normalized = normalized
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
    
    // Normalize section numbering formats
    normalized = normalized.replace(/^(\d+)\s+SEC\.\s+/gm, 'SEC. ');
    normalized = normalized.replace(/^(\d+)\s+SECTION\s+/gm, 'SECTION ');
    
    // Remove XML/file reference lines
    normalized = normalized.replace(/^[A-Z]+_[A-Z]+_[A-Z]+\.XML$/gm, '');
    normalized = normalized.replace(/^\(\d+\|\d+\)$/gm, '');
    
    return normalized;
  }

  /**
   * Extracts only the substantive content sections for comparison
   */
  static extractSubstantiveContent(text: string): string {
    const lines = text.split('\n');
    const substantiveLines: string[] = [];
    let inContent = false;
    let sectionCount = 0;
    
    for (const line of lines) {
      // Start capturing after table of contents
      if (line.includes('Be it enacted by') || line.includes('SECTION 1.')) {
        inContent = true;
      }
      
      // Skip header material
      if (!inContent) continue;
      
      // Skip formatting lines
      if (line.match(/^\.{5,}$/)) continue;
      if (line.match(/^VerDate/)) continue;
      if (line.match(/^g:\\/)) continue;
      if (line.match(/^\d+$/)) continue; // Page numbers
      if (line.match(/^\(\d+\|\d+\)$/)) continue;
      
      // Include substantive content
      if (line.trim().length > 0) {
        substantiveLines.push(line);
        
        // Count sections to ensure we're getting content
        if (line.match(/^(?:SEC\.|SECTION)\s+\d+/)) {
          sectionCount++;
        }
      }
    }
    
    // If we didn't find sections, try a more lenient approach
    if (sectionCount < 5) {
      return this.normalizeBillText(text);
    }
    
    return substantiveLines.join('\n');
  }

  /**
   * Prepares text specifically for diff comparison
   */
  static prepareForDiff(text: string): string {
    // First normalize
    let prepared = this.normalizeBillText(text);
    
    // Then extract substantive content
    prepared = this.extractSubstantiveContent(prepared);
    
    // Additional normalization for comparison
    // Normalize quotes
    prepared = prepared.replace(/[""]/g, '"');
    prepared = prepared.replace(/['']/g, "'");
    
    // Normalize dashes
    prepared = prepared.replace(/[—–]/g, '-');
    
    // Remove extra whitespace around punctuation
    prepared = prepared.replace(/\s+([,.;:])/g, '$1');
    prepared = prepared.replace(/([,.;:])\s+/g, '$1 ');
    
    return prepared;
  }
}
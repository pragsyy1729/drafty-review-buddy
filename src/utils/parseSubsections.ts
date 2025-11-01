export interface Section {
  id: string;
  title: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
}

/**
 * Parse markdown text into subsections based on headings
 * Priority:
 * 1. Markdown H2 headings (## Title)
 * 2. Numbered headings (1. Title, A) Title, - Title) surrounded by blank lines
 * 3. If no headings found, treat entire text as single "Main" subsection
 */
export function parseSubsections(markdown: string): Omit<Section, 'status' | 'feedback'>[] {
  if (!markdown.trim()) {
    return [];
  }

  // Try H2 headings first
  const h2Pattern = /^##\s+(.+)$/gm;
  const h2Matches = [...markdown.matchAll(h2Pattern)];

  if (h2Matches.length > 0) {
    const sections: Omit<Section, 'status' | 'feedback'>[] = [];
    
    h2Matches.forEach((match, index) => {
      const title = match[1].trim();
      const startPos = match.index!;
      const endPos = index < h2Matches.length - 1 
        ? h2Matches[index + 1].index! 
        : markdown.length;
      
      // Extract body (everything after the heading line until next heading)
      const sectionText = markdown.substring(startPos, endPos);
      const body = sectionText.replace(/^##\s+.+$/m, '').trim();
      
      sections.push({
        id: `section-${index}-${title.toLowerCase().replace(/\s+/g, '-')}`,
        title,
        body: body || '(No content)',
      });
    });
    
    return sections;
  }

  // Fallback: Try numbered headings
  const numberedPattern = /^(\d+\.|[A-Za-z]\)|\-)\s+(.+)$/gm;
  const numberedMatches = [...markdown.matchAll(numberedPattern)];

  if (numberedMatches.length > 0) {
    const sections: Omit<Section, 'status' | 'feedback'>[] = [];
    
    numberedMatches.forEach((match, index) => {
      const title = match[2].trim();
      const startPos = match.index!;
      const endPos = index < numberedMatches.length - 1 
        ? numberedMatches[index + 1].index! 
        : markdown.length;
      
      const sectionText = markdown.substring(startPos, endPos);
      const body = sectionText.replace(/^(\d+\.|[A-Za-z]\)|\-)\s+.+$/m, '').trim();
      
      sections.push({
        id: `section-${index}-${title.toLowerCase().replace(/\s+/g, '-')}`,
        title,
        body: body || '(No content)',
      });
    });
    
    return sections;
  }

  // No headings found: treat entire text as single subsection
  return [{
    id: 'section-0-main',
    title: 'Main',
    body: markdown.trim(),
  }];
}

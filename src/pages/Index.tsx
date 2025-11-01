import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import InputPanel from '@/components/InputPanel';
import OutputPanel from '@/components/OutputPanel';
import EditReviewPanel from '@/components/EditReviewPanel';
import { parseSubsections, Section } from '@/utils/parseSubsections';

type Mode = 'review' | 'edit';
type Theme = 'light' | 'dark';

const SAMPLE_OUTPUT = `## Introduction
This section introduces the generated content. Welcome to the Lovable Website Generator, where you can transform raw paragraphs into structured, reviewable content.

## Key Insights
Here are 3–5 key insights derived from the input paragraphs:
- Insight one: The content is well-structured
- Insight two: Clear subsections make review easier
- Insight three: Red accents create visual hierarchy

## Recommendations
Actionable steps the user can take next:
1. Review each subsection carefully
2. Approve sections that meet your standards
3. Provide feedback on rejected sections
4. Once all approved, content returns to review mode`;

const Index = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState(SAMPLE_OUTPUT);
  const [mode, setMode] = useState<Mode>('review');
  const [sections, setSections] = useState<Section[]>([]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const handleThemeToggle = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleEdit = () => {
    const parsed = parseSubsections(outputText);
    const sectionsWithStatus: Section[] = parsed.map(s => ({
      ...s,
      status: 'pending' as const,
    }));
    setSections(sectionsWithStatus);
    setMode('edit');
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setSections([]);
    setMode('review');
  };

  const handleApprove = (sectionId: string) => {
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, status: 'approved' as const, feedback: undefined }
          : s
      )
    );
  };

  const handleReject = (sectionId: string) => {
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId ? { ...s, status: 'rejected' as const } : s
      )
    );
  };

  const handleFeedbackChange = (sectionId: string, feedback: string) => {
    setSections(prev =>
      prev.map(s => (s.id === sectionId ? { ...s, feedback } : s))
    );
  };

  // Auto-exit edit mode when all sections are approved
  useEffect(() => {
    if (mode === 'edit' && sections.length > 0) {
      const allApproved = sections.every(s => s.status === 'approved');
      if (allApproved) {
        setMode('review');
      }
    }
  }, [sections, mode]);

  return (
    <div className="min-h-screen bg-background">
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      
      <main className="container mx-auto px-4 py-8">
        {mode === 'review' ? (
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
            <InputPanel
              value={inputText}
              onChange={setInputText}
            />
            <OutputPanel
              content={outputText}
              onEdit={handleEdit}
              onClear={handleClear}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <EditReviewPanel
              sections={sections}
              onApprove={handleApprove}
              onReject={handleReject}
              onFeedbackChange={handleFeedbackChange}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

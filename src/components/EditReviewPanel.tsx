import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { Section } from '@/utils/parseSubsections';

interface EditReviewPanelProps {
  sections: Section[];
  onApprove: (sectionId: string) => void;
  onReject: (sectionId: string) => void;
  onFeedbackChange: (sectionId: string, feedback: string) => void;
}

const EditReviewPanel = ({ 
  sections, 
  onApprove, 
  onReject, 
  onFeedbackChange 
}: EditReviewPanelProps) => {
  const approvedCount = sections.filter(s => s.status === 'approved').length;
  const totalCount = sections.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Review Subsections</h2>
        <div 
          className="text-sm font-semibold px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20"
          role="status"
          aria-live="polite"
        >
          Approved {approvedCount} / {totalCount}
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`p-6 rounded-2xl border transition-all ${
              section.status === 'approved'
                ? 'bg-primary/5 border-primary/30'
                : section.status === 'rejected'
                ? 'bg-destructive/5 border-destructive/30'
                : 'bg-card border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => onApprove(section.id)}
                  variant={section.status === 'approved' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-xl"
                  aria-label={`Approve ${section.title}`}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => onReject(section.id)}
                  variant={section.status === 'rejected' ? 'destructive' : 'outline'}
                  size="sm"
                  className="rounded-xl"
                  aria-label={`Reject ${section.title}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="markdown-content text-sm mb-4">
              <ReactMarkdown>{section.body}</ReactMarkdown>
            </div>

            {section.status === 'rejected' && (
              <div className="mt-4 space-y-2">
                <label 
                  htmlFor={`feedback-${section.id}`}
                  className="text-sm font-medium text-foreground"
                >
                  Feedback for this subsection:
                </label>
                <Input
                  id={`feedback-${section.id}`}
                  value={section.feedback || ''}
                  onChange={(e) => onFeedbackChange(section.id, e.target.value)}
                  placeholder="Enter your feedback here…"
                  className="rounded-xl"
                  aria-label={`Feedback for ${section.title}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditReviewPanel;

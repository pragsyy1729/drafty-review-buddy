import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface OutputPanelProps {
  content: string;
  onEdit: () => void;
  onClear: () => void;
}

const OutputPanel = ({ content, onEdit, onClear }: OutputPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-foreground">
          Output
        </label>
        <div className="flex gap-2">
          <Button
            onClick={onEdit}
            variant="default"
            size="sm"
            className="rounded-xl"
            aria-label="Enter edit mode"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={onClear}
            variant="destructive"
            size="sm"
            className="rounded-xl"
            aria-label="Clear all content"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full p-4 rounded-2xl border bg-card text-card-foreground overflow-auto">
        {content ? (
          <div className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-muted-foreground italic">No content yet. Generate some output to begin.</p>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;

interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const InputPanel = ({ value, onChange, disabled }: InputPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <label htmlFor="input-text" className="text-sm font-semibold mb-2 text-foreground">
        Input
      </label>
      <textarea
        id="input-text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste paragraphs here…"
        className="flex-1 w-full p-4 rounded-2xl border bg-card text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        aria-label="Input text area"
      />
    </div>
  );
};

export default InputPanel;

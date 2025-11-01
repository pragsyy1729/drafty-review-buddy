import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Header = ({ theme, onThemeToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-foreground">
            Lovable Website Generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Paste paragraphs, generate a structured draft, and review by subsection
          </p>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="rounded-xl transition-transform hover:scale-105"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;

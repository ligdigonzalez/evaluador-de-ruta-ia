// Header component for the assessment tool
// Shows AprendeIA branding and progress indicator

import { Brain } from "lucide-react";

interface HeaderProps {
  showProgress?: boolean;
  currentStep?: string;
}

export function Header({ showProgress, currentStep }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-foreground text-lg leading-tight">
              AprendeIA
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
              Sin hype, con honestidad
            </span>
          </div>
        </div>

        {/* Current step indicator */}
        {showProgress && currentStep && (
          <div className="text-sm text-muted-foreground">
            {currentStep}
          </div>
        )}
      </div>
    </header>
  );
}

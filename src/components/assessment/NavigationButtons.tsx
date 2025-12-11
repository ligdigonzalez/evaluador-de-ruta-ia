// Navigation buttons for moving between questions
// Includes back button, next button, and submit button for final question

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  className?: string;
}

export function NavigationButtons({
  currentQuestion,
  totalQuestions,
  canProceed,
  onBack,
  onNext,
  onSubmit,
  className,
}: NavigationButtonsProps) {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className={cn("flex justify-between items-center gap-4", className)}>
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        disabled={isFirstQuestion}
        className={cn(
          "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
          isFirstQuestion && "invisible"
        )}
        aria-label="Volver a la pregunta anterior"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Atrás</span>
      </Button>

      {/* Next/Submit button */}
      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          disabled={!canProceed}
          className="btn-accent flex items-center gap-2 min-w-[140px]"
          aria-label="Ver mis resultados"
        >
          <span>Ver Resultados</span>
          <Send className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary flex items-center gap-2 min-w-[140px]"
          aria-label="Ir a la siguiente pregunta"
        >
          <span>Siguiente</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

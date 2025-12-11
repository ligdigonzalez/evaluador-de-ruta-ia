// Progress bar component showing assessment progress
// Displays current question number and visual progress indicator

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

export function ProgressBar({ currentQuestion, totalQuestions, className }: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Question counter */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Pregunta {currentQuestion} de {totalQuestions}
        </span>
        <span className="text-sm font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progreso: ${Math.round(progress)}%`}
        />
      </div>
    </div>
  );
}

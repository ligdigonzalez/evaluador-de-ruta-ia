// Question card component for displaying individual assessment questions
// Supports both radio (single select) and checkbox (multi-select) question types

import { useState, useEffect } from "react";
import { Question, categoryIcons } from "@/data/questions";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | string[] | number | null;
  onAnswer: (questionId: number, answer: string | string[] | number) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswer }: QuestionCardProps) {
  // For checkbox questions, manage local state as array
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Sync local state with parent state on mount/change
  useEffect(() => {
    if (question.type === "checkbox" && Array.isArray(selectedAnswer)) {
      setSelectedOptions(selectedAnswer);
    } else if (question.type === "checkbox") {
      setSelectedOptions([]);
    }
  }, [question.id, selectedAnswer, question.type]);

  // Handle radio button selection
  const handleRadioSelect = (optionId: string, value: string | number) => {
    onAnswer(question.id, value);
  };

  // Handle checkbox selection
  const handleCheckboxSelect = (optionId: string, value: string) => {
    let newSelected: string[];

    // If "none" is selected, clear others
    if (value === "none") {
      newSelected = selectedOptions.includes("none") ? [] : ["none"];
    } else {
      // Remove "none" if selecting other options
      const withoutNone = selectedOptions.filter((v) => v !== "none");

      if (withoutNone.includes(value)) {
        // Deselect
        newSelected = withoutNone.filter((v) => v !== value);
      } else {
        // Check max selections
        if (question.maxSelections && withoutNone.length >= question.maxSelections) {
          // Don't add more
          return;
        }
        newSelected = [...withoutNone, value];
      }
    }

    setSelectedOptions(newSelected);
    onAnswer(question.id, newSelected);
  };

  // Check if an option is selected
  const isOptionSelected = (value: string | number): boolean => {
    if (question.type === "radio") {
      return selectedAnswer === value;
    }
    return selectedOptions.includes(String(value));
  };

  // Get category icon
  const categoryIcon = categoryIcons[question.category] || "📋";

  return (
    <div className="animate-fade-in">
      {/* Category badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{categoryIcon}</span>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {question.category}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        {question.question}
      </h2>

      {/* Selection hint for checkbox questions */}
      {question.type === "checkbox" && (
        <p className="text-sm text-muted-foreground mb-6">
          {question.maxSelections
            ? `Selecciona hasta ${question.maxSelections} opciones`
            : "Selecciona todas las que apliquen"}
        </p>
      )}

      {question.type === "radio" && (
        <p className="text-sm text-muted-foreground mb-6">
          Selecciona una opción
        </p>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = isOptionSelected(option.value);

          return (
            <button
              key={option.id}
              onClick={() => {
                if (question.type === "radio") {
                  handleRadioSelect(option.id, option.value);
                } else {
                  handleCheckboxSelect(option.id, String(option.value));
                }
              }}
              className={cn(
                question.type === "radio" ? "option-card" : "option-card-checkbox",
                isSelected && "selected"
              )}
              aria-pressed={isSelected}
              role={question.type === "radio" ? "radio" : "checkbox"}
            >
              <div className="flex items-center gap-3">
                {/* Selection indicator */}
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
                    question.type === "checkbox" && "rounded-md",
                    isSelected
                      ? question.type === "radio"
                        ? "border-primary bg-primary"
                        : "border-secondary bg-secondary"
                      : "border-border"
                  )}
                >
                  {isSelected && (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  )}
                </div>

                {/* Option text */}
                <span
                  className={cn(
                    "text-base md:text-lg transition-colors",
                    isSelected ? "text-foreground font-medium" : "text-foreground/80"
                  )}
                >
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Validation message for max selections */}
      {question.type === "checkbox" && question.maxSelections && selectedOptions.length === question.maxSelections && (
        <p className="text-sm text-secondary mt-4 flex items-center gap-2">
          <Check className="w-4 h-4" />
          Has seleccionado el máximo de opciones
        </p>
      )}
    </div>
  );
}

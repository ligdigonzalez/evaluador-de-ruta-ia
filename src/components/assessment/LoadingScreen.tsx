// Loading screen displayed while "analyzing" answers
// Creates anticipation before showing results

import { useEffect, useState } from "react";
import { Brain, Sparkles, Target } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, text: "Analizando tus respuestas" },
    { icon: Sparkles, text: "Personalizando tu roadmap" },
    { icon: Target, text: "Preparando recomendaciones" },
  ];

  useEffect(() => {
    // Progress through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    // Complete after all steps
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      {/* Animated brain icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <Brain className="w-12 h-12 text-primary" />
        </div>
        {/* Orbiting sparkles */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          <Sparkles className="w-6 h-6 text-accent absolute -top-2 left-1/2 -translate-x-1/2" />
        </div>
      </div>

      {/* Progress steps */}
      <div className="space-y-4 w-full max-w-xs">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 transition-all duration-500 ${
                isActive ? "opacity-100" : "opacity-30"
              }`}
            >
              {/* Step indicator */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                } ${isCurrent ? "scale-110" : ""}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Step text */}
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.text}
                {isCurrent && <span className="loading-dots" />}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-8">
        <div className="progress-bar">
          <div
            className="progress-bar-fill transition-all duration-700 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

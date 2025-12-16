// Main Assessment page component
// Orchestrates the entire assessment flow from start to results

import { useState, useEffect, useCallback } from "react";
import { questions } from "@/data/questions";
import { UserAnswers, buildUserProfile, matchRoadmap, UserProfile } from "@/utils/scoring";
import { Roadmap } from "@/data/roadmaps";
import { Header } from "@/components/layout/Header";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { NavigationButtons } from "@/components/assessment/NavigationButtons";
import { LoadingScreen } from "@/components/assessment/LoadingScreen";
import { EmailCapture } from "@/components/assessment/EmailCapture";
import { ResultsPage } from "@/components/results/ResultsPage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CheckCircle, Sparkles } from "lucide-react";

// Assessment flow stages
type AssessmentStage = "welcome" | "questions" | "loading" | "email" | "results";

// LocalStorage key for saving progress
const STORAGE_KEY = "aprendeia_assessment";

export default function Assessment() {
  // Current stage of the assessment
  const [stage, setStage] = useState<AssessmentStage>("welcome");

  // Current question index (1-based for display)
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // User's answers stored by question ID
  const [answers, setAnswers] = useState<UserAnswers>({});

  // User profile (calculated after all questions)
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Matched roadmap
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  // User email, name, and country
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userCountry, setUserCountry] = useState("");

  // Load saved progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          setAnswers(parsed.answers);
          // Don't auto-resume to questions - let user choose
        }
      }
    } catch (error) {
      console.error("Error loading saved progress:", error);
    }
  }, []);

  // Save progress to localStorage when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            answers,
            currentQuestion,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    }
  }, [answers, currentQuestion]);

  // Handle answer selection
  const handleAnswer = useCallback(
    (questionId: number, answer: string | string[] | number) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }));
    },
    []
  );

  // Check if current question has a valid answer
  const canProceed = useCallback((): boolean => {
    const question = questions[currentQuestion - 1];
    const answer = answers[question.id];

    // Check for undefined/null explicitly (0 is a valid answer)
    if (answer === undefined || answer === null) return false;

    if (question.type === "checkbox") {
      const arrayAnswer = answer as string[];
      const minSelections = question.minSelections || 0;
      return arrayAnswer.length >= minSelections;
    }

    return true;
  }, [currentQuestion, answers]);

  // Navigate to next question
  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion]);

  // Navigate to previous question
  const handleBack = useCallback(() => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  // Submit assessment (after last question)
  const handleSubmit = useCallback(() => {
    // Show loading screen
    setStage("loading");
  }, []);

  // After loading completes, show email capture
  const handleLoadingComplete = useCallback(() => {
    // Calculate profile and roadmap
    const userProfile = buildUserProfile(answers);
    const matchedRoadmap = matchRoadmap(userProfile);

    setProfile(userProfile);
    setRoadmap(matchedRoadmap);
    setStage("email");
  }, [answers]);

  // After email submission, show results
  const handleEmailSubmit = useCallback((email: string, name: string, country: string) => {
    setUserEmail(email);
    setUserName(name);
    setUserCountry(country);

    // In a real app, you'd send data to backend here
    // For now, just save to localStorage and show results
    try {
      localStorage.setItem(
        `${STORAGE_KEY}_completed`,
        JSON.stringify({
          email,
          name,
          country,
          answers,
          profile,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error("Error saving completion data:", error);
    }

    setStage("results");
  }, [answers, profile]);

  // Start the assessment
  const handleStart = useCallback(() => {
    setStage("questions");
    setCurrentQuestion(1);
  }, []);

  // Resume saved progress
  const handleResume = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentQuestion(parsed.currentQuestion || 1);
    }
    setStage("questions");
  }, []);

  // Clear saved progress and start fresh
  const handleStartFresh = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setCurrentQuestion(1);
    setStage("questions");
  }, []);

  // Get current step label for header
  const getCurrentStepLabel = (): string => {
    switch (stage) {
      case "welcome":
        return "Inicio";
      case "questions":
        return `Pregunta ${currentQuestion}/${questions.length}`;
      case "loading":
        return "Analizando...";
      case "email":
        return "Casi listo";
      case "results":
        return "Tu roadmap";
      default:
        return "";
    }
  };

  // Check if there's saved progress
  const hasSavedProgress = Object.keys(answers).length > 0 && stage === "welcome";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header showProgress={stage !== "welcome"} currentStep={getCurrentStepLabel()} />

      {/* Main Content */}
      <main>
        {/* Welcome Screen */}
        {stage === "welcome" && (
          <div className="container max-w-2xl mx-auto px-4 py-12 md:py-20">
            <div className="text-center animate-fade-in">
              {/* Hero icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Evaluador de Ruta de Aprendizaje IA
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
                Descubre qué aprender sobre IA según tu nivel y objetivos en 3 minutos
              </p>

              {/* Benefits */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>2-3 minutos</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span>10 preguntas</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Roadmap personalizado</span>
                </div>
              </div>

              {/* CTA Buttons */}
              {hasSavedProgress ? (
                <div className="space-y-3">
                  <Button onClick={handleResume} className="btn-primary w-full sm:w-auto min-w-[200px] h-14 text-lg gap-2">
                    Continuar donde lo dejé
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <div>
                    <Button
                      variant="ghost"
                      onClick={handleStartFresh}
                      className="text-muted-foreground"
                    >
                      O empezar de nuevo
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={handleStart} className="btn-primary w-full sm:w-auto min-w-[200px] h-14 text-lg gap-2">
                  Comenzar Evaluación
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}

              {/* Trust indicator */}
              <p className="text-xs text-muted-foreground mt-8">
                100% gratis • Sin registro previo • Resultados inmediatos
              </p>
            </div>
          </div>
        )}

        {/* Questions Stage */}
        {stage === "questions" && (
          <div className="container max-w-2xl mx-auto px-4 py-8">
            {/* Progress bar */}
            <ProgressBar
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              className="mb-8"
            />

            {/* Current question */}
            <div className="mb-10">
              <QuestionCard
                key={questions[currentQuestion - 1].id}
                question={questions[currentQuestion - 1]}
                selectedAnswer={answers[questions[currentQuestion - 1].id] ?? null}
                onAnswer={handleAnswer}
              />
            </div>

            {/* Navigation buttons */}
            <NavigationButtons
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              canProceed={canProceed()}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {/* Loading Stage */}
        {stage === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}

        {/* Email Capture Stage */}
        {stage === "email" && <EmailCapture onSubmit={handleEmailSubmit} />}

        {/* Results Stage */}
        {stage === "results" && profile && roadmap && (
          <ResultsPage profile={profile} roadmap={roadmap} userName={userName} />
        )}
      </main>
    </div>
  );
}

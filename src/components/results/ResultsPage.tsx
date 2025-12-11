// Main results page component
// Displays the complete personalized roadmap with all sections

import { UserProfile } from "@/utils/scoring";
import { Roadmap } from "@/data/roadmaps";
import { levelDescriptions } from "@/data/roadmaps";
import { LevelBadge } from "./LevelBadge";
import { RoadmapPhase } from "./RoadmapPhase";
import { FirstStepCard } from "./FirstStepCard";
import { CourseCard } from "./CourseCard";
import { MotivationSection } from "./MotivationSection";
import { Button } from "@/components/ui/button";
import { Download, Share2, Youtube, ArrowUp } from "lucide-react";

interface ResultsPageProps {
  profile: UserProfile;
  roadmap: Roadmap;
  userName?: string;
}

export function ResultsPage({ profile, roadmap, userName }: ResultsPageProps) {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background py-10 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center animate-fade-in">
            {/* Social proof */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
              <Youtube className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">
                Únete a más de <strong className="text-foreground">72,000</strong> personas aprendiendo IA
              </span>
            </div>

            {/* Level display */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-3">
                🎯 Tu Nivel de IA
              </p>
              <LevelBadge level={profile.level} />
            </div>

            {/* Profile name */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                Tu Perfil
              </p>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {roadmap.profileName}
              </h1>
            </div>

            {/* Profile description */}
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {roadmap.profileDescription}
            </p>

            {/* Level description */}
            <p className="text-muted-foreground mt-4">
              {levelDescriptions[profile.level]}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 space-y-10">
        {/* First Step - Most Important CTA */}
        <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <FirstStepCard firstStep={roadmap.firstStep} />
        </section>

        {/* Roadmap Phases */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              📍 Tu Roadmap Personalizado en 3 Fases
            </h2>
          </div>

          <div className="space-y-4">
            {roadmap.phases.map((phase, index) => (
              <RoadmapPhase
                key={phase.number}
                phase={phase}
                isExpanded={index === 0}
              />
            ))}
          </div>
        </section>

        {/* Course Recommendation */}
        <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CourseCard
            course={roadmap.recommendedCourse}
            profileName={roadmap.profileName}
          />
        </section>

        {/* Motivation Section */}
        <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <MotivationSection profile={profile} />
        </section>

        {/* Action Buttons */}
        <section className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1 h-12 gap-2">
              <Download className="w-4 h-4" />
              Descarga tu Roadmap (PDF)
            </Button>
            <Button variant="outline" className="flex-1 h-12 gap-2">
              <Share2 className="w-4 h-4" />
              Comparte tu Nivel
            </Button>
          </div>
        </section>

        {/* Scroll to top */}
        <div className="flex justify-center pt-6">
          <Button
            variant="ghost"
            onClick={scrollToTop}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <ArrowUp className="w-4 h-4" />
            Volver arriba
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Generado por{" "}
            <strong className="text-foreground">AprendeIA</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            "Inteligencia Artificial sin hype, con honestidad"
          </p>
        </div>
      </footer>
    </div>
  );
}

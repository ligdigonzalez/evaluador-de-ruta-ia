// Roadmap phase card component
// Displays a single phase of the learning roadmap with expandable details

import { useState } from "react";
import { Phase } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  BookOpen,
  Wrench,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadmapPhaseProps {
  phase: Phase;
  isExpanded?: boolean;
}

export function RoadmapPhase({ phase, isExpanded: defaultExpanded = false }: RoadmapPhaseProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Phase number styling
  const phaseColors = {
    1: "bg-primary text-primary-foreground",
    2: "bg-secondary text-secondary-foreground",
    3: "bg-accent text-accent-foreground",
  };

  return (
    <div className="phase-card animate-fade-in">
      {/* Phase header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start gap-4">
          {/* Phase number */}
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg",
              phaseColors[phase.number as keyof typeof phaseColors] || phaseColors[1]
            )}
          >
            {phase.number}
          </div>

          {/* Phase info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                {phase.title}
              </h3>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </div>

            {/* Duration badge */}
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {phase.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <Target className="w-4 h-4" />
                {phase.estimatedTime}
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[1000px] opacity-100 mt-6" : "max-h-0 opacity-0"
        )}
      >
        {/* Objective */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Objetivo
          </h4>
          <p className="text-foreground/80">{phase.objective}</p>
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-secondary" />
            Habilidades a Desarrollar
          </h4>
          <ul className="space-y-2">
            {phase.skills.map((skill, index) => (
              <li key={index} className="flex items-start gap-2 text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />
            Recursos Recomendados
          </h4>
          <div className="space-y-2">
            {phase.resources.map((resource, index) => {
              const content = (
                <>
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {resource.title}
                    </p>
                    {resource.duration && (
                      <p className="text-xs text-muted-foreground">{resource.duration}</p>
                    )}
                  </div>
                </>
              );

              return resource.url ? (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* Project */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            📋 Proyecto Práctico
          </h4>
          <p className="text-foreground/80 text-sm leading-relaxed">{phase.project}</p>
        </div>
      </div>
    </div>
  );
}

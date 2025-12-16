// First step card - prominent CTA for immediate action
// Shows the first video to watch and immediate action to take

import { Button } from "@/components/ui/button";
import { Play, Zap, Clock } from "lucide-react";
import { Roadmap } from "@/data/roadmaps";

interface FirstStepCardProps {
  firstStep: Roadmap["firstStep"];
}

export function FirstStepCard({ firstStep }: FirstStepCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/30 p-6 md:p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
          <Zap className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
            🚀 EMPIEZA AQUÍ HOY
          </h3>
          <p className="text-sm text-muted-foreground">Tu primer paso hacia dominar la IA</p>
        </div>
      </div>

      {/* Video recommendation */}
      <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 mb-5 border border-border/50">
        <div className="flex items-start gap-4">
          {/* Video thumbnail placeholder */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Play className="w-8 h-8 text-destructive" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              📺 Video recomendado
            </p>
            <h4 className="font-semibold text-foreground leading-snug mb-2">
              {firstStep.video}
            </h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Duración: {firstStep.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action description */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
          ⚡ Acción inmediata:
        </p>
        <p className="text-foreground/80 leading-relaxed">
          {firstStep.action}
        </p>
      </div>

      {/* CTA Button */}
      <Button className="btn-accent w-full h-14 text-lg font-semibold gap-2">
        <Play className="w-5 h-5" />
        Ver Video Gratis
      </Button>
    </div>
  );
}

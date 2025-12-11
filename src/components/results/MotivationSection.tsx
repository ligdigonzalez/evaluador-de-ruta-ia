// Personalized motivation section
// Displays encouraging message based on user's barriers and context

import { UserProfile } from "@/utils/scoring";
import { generateMotivationMessage, getBarrierReassurance } from "@/utils/scoring";
import { Heart, Lightbulb, MessageCircle } from "lucide-react";

interface MotivationSectionProps {
  profile: UserProfile;
}

export function MotivationSection({ profile }: MotivationSectionProps) {
  const motivationMessage = generateMotivationMessage(profile);
  const barrierReassurance = getBarrierReassurance(profile.barriers);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border border-secondary/20 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
          <Heart className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="text-lg font-display font-bold text-foreground">
          Tu Mensaje Personalizado
        </h3>
      </div>

      {/* Barrier reassurance */}
      <div className="flex items-start gap-3 mb-5 p-4 rounded-xl bg-card border border-border/50">
        <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-foreground/90 leading-relaxed">
          {barrierReassurance}
        </p>
      </div>

      {/* Main motivation */}
      <div className="flex items-start gap-3">
        <MessageCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-foreground/90 leading-relaxed mb-4">
            {motivationMessage}
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Recuerda: la IA es una herramienta poderosa, pero{" "}
            <strong>tú sigues siendo el cerebro detrás</strong>. No hay atajos
            mágicos, pero con práctica consistente y este roadmap claro, los
            resultados llegarán.
          </p>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-6 pt-5 border-t border-secondary/20">
        <p className="text-sm text-muted-foreground italic">
          "Inteligencia Artificial sin hype, con honestidad"
        </p>
        <p className="text-sm font-medium text-foreground mt-1">
          — Ligdi González, AprendeIA
        </p>
      </div>
    </div>
  );
}

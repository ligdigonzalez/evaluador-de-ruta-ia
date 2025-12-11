// Level badge component for displaying user's AI proficiency level
// Uses color-coded styling based on level

import { cn } from "@/lib/utils";
import { UserProfile } from "@/utils/scoring";
import { Sparkles, Star, Rocket, Trophy } from "lucide-react";

interface LevelBadgeProps {
  level: UserProfile["level"];
  className?: string;
}

const levelConfig = {
  NOVATO: {
    label: "Novato",
    icon: Sparkles,
    className: "level-novato",
    description: "Empezando tu viaje",
  },
  BASICO: {
    label: "Básico",
    icon: Star,
    className: "level-basico",
    description: "Construyendo bases",
  },
  INTERMEDIO: {
    label: "Intermedio",
    icon: Rocket,
    className: "level-intermedio",
    description: "Avanzando fuerte",
  },
  AVANZADO: {
    label: "Avanzado",
    icon: Trophy,
    className: "level-avanzado",
    description: "Dominando la IA",
  },
};

export function LevelBadge({ level, className }: LevelBadgeProps) {
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Large badge */}
      <div
        className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center mb-4",
          config.className.replace("level-", "bg-").split(" ")[0] + "-100"
        )}
      >
        <Icon
          className={cn(
            "w-12 h-12",
            level === "NOVATO" && "text-blue-600",
            level === "BASICO" && "text-green-600",
            level === "INTERMEDIO" && "text-amber-600",
            level === "AVANZADO" && "text-purple-600"
          )}
        />
      </div>

      {/* Level text */}
      <div className={cn("level-badge text-lg", config.className)}>
        {config.label}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-2">{config.description}</p>
    </div>
  );
}

// Scoring and profile matching logic for AprendeIA Assessment
// Calculates user level and matches to appropriate roadmap

import { roadmaps, defaultRoadmap, Roadmap } from "@/data/roadmaps";

export interface UserAnswers {
  [questionId: number]: string | string[] | number;
}

export interface UserProfile {
  level: "NOVATO" | "BASICO" | "INTERMEDIO" | "AVANZADO";
  levelScore: number;
  context: string;
  painPoint: string;
  goals: string[];
  urgency: string;
  weeklyHours: number;
  learningStyle: string;
  barriers: string[];
}

/**
 * Calculate the user's level based on Q1, Q2, Q3 answers
 * @param answers - User's answers object
 * @returns Object with level and numeric score
 */
export function calculateLevel(answers: UserAnswers): { level: UserProfile["level"]; score: number } {
  // Q1: Direct level score (0-4)
  const q1Score = typeof answers[1] === "number" ? answers[1] : 0;

  // Q2: Tools experience - score based on count
  let q2Score = 0;
  const q2Answer = answers[2];
  if (Array.isArray(q2Answer)) {
    // Check if "none" is selected
    const hasNone = q2Answer.includes("none");
    if (!hasNone) {
      const count = q2Answer.length;
      if (count >= 5) q2Score = 1.5;
      else if (count >= 3) q2Score = 1;
      else if (count >= 1) q2Score = 0.5;
    }
  }

  // Q3: Prompt experience score (0-2)
  const q3Score = typeof answers[3] === "number" ? answers[3] : 0;

  // Total score
  const totalScore = q1Score + q2Score + q3Score;

  // Map to level
  let level: UserProfile["level"];
  if (totalScore <= 1) {
    level = "NOVATO";
  } else if (totalScore <= 2.5) {
    level = "BASICO";
  } else if (totalScore <= 4) {
    level = "INTERMEDIO";
  } else {
    level = "AVANZADO";
  }

  return { level, score: totalScore };
}

/**
 * Build complete user profile from answers
 * @param answers - User's answers object
 * @returns Complete user profile
 */
export function buildUserProfile(answers: UserAnswers): UserProfile {
  const { level, score } = calculateLevel(answers);

  // Q4: Context
  const context = typeof answers[4] === "string" ? answers[4] : "freelancer";

  // Q5: Pain point
  const painPoint = typeof answers[5] === "string" ? answers[5] : "contenido";

  // Q6: Goals (array, max 2)
  const goals = Array.isArray(answers[6]) ? answers[6] : [];

  // Q7: Urgency
  const urgency = typeof answers[7] === "string" ? answers[7] : "media";

  // Q8: Weekly hours
  const weeklyHours = typeof answers[8] === "number" ? answers[8] : 4;

  // Q9: Learning style
  const learningStyle = typeof answers[9] === "string" ? answers[9] : "mixto";

  // Q10: Barriers
  const barriers = Array.isArray(answers[10]) ? answers[10] : [];

  return {
    level,
    levelScore: score,
    context,
    painPoint,
    goals,
    urgency,
    weeklyHours,
    learningStyle,
    barriers,
  };
}

/**
 * Match user profile to the best roadmap
 * @param profile - User's profile
 * @returns Matched roadmap
 */
export function matchRoadmap(profile: UserProfile): Roadmap {
  const { level, context, painPoint } = profile;

  // Profile matching logic
  // Priority 1: Context + Pain Point specific matches

  // Freelancer/Creator focused on content
  if (
    (context === "freelancer" || context === "creador") &&
    (painPoint === "contenido" || painPoint === "diseno")
  ) {
    return roadmaps["freelancer-contenido"];
  }

  // Entrepreneur focused on communication/customer service
  if (
    (context === "emprendedor" || context === "emprendedor-early") &&
    (painPoint === "comunicacion" || painPoint === "admin")
  ) {
    return roadmaps["emprendedor-comunicacion"];
  }

  // Employee focused on productivity
  if (
    context === "empleado" &&
    (painPoint === "admin" || painPoint === "investigacion" || painPoint === "estrategia")
  ) {
    return roadmaps["empleado-productividad"];
  }

  // Student or career transition
  if (context === "estudiante") {
    return roadmaps["estudiante-general"];
  }

  // Priority 2: Level-based fallbacks
  if (level === "NOVATO" || level === "BASICO") {
    // New users go to student path (most comprehensive for beginners)
    if (painPoint === "contenido") {
      return roadmaps["freelancer-contenido"];
    }
    return roadmaps["estudiante-general"];
  }

  // Priority 3: Pain point based for intermediate/advanced
  if (painPoint === "contenido") {
    return roadmaps["freelancer-contenido"];
  }
  if (painPoint === "comunicacion") {
    return roadmaps["emprendedor-comunicacion"];
  }
  if (painPoint === "admin" || painPoint === "investigacion") {
    return roadmaps["empleado-productividad"];
  }

  // Default fallback
  return defaultRoadmap;
}

/**
 * Generate personalized motivation message based on barriers and profile
 * @param profile - User's profile
 * @returns Personalized motivation message
 */
export function generateMotivationMessage(profile: UserProfile): string {
  const { context, weeklyHours, barriers } = profile;

  // Base message varies by context
  const contextMessages: Record<string, string> = {
    freelancer: `Como freelancer, la IA puede liberarte 10-15 horas semanales en tareas repetitivas. Esas horas puedes usarlas para conseguir más clientes o tener mejor balance vida-trabajo.`,
    empleado: `Ser el primero en tu equipo dominando IA te posiciona como innovador y solucionador de problemas. Las empresas están buscando empleados que puedan liderar la transformación digital.`,
    emprendedor: `Cada hora que gastas en tareas operativas es una hora que no inviertes en hacer crecer tu negocio. Un asistente bien diseñado puede responder 60-80% de consultas comunes.`,
    "emprendedor-early": `En las etapas tempranas, la IA es tu mejor aliada para hacer más con menos recursos. Puedes competir con empresas más grandes sin necesidad de un equipo grande.`,
    estudiante: `Dominar IA te diferencia del 95% de tus compañeros. Las empresas están buscando desesperadamente gente que entienda IA práctica, no solo teoría.`,
    creador: `La IA puede multiplicar tu capacidad de crear contenido de calidad, permitiéndote mantener presencia constante sin burnout.`,
  };

  let message = contextMessages[context] || contextMessages.freelancer;

  // Add time estimation
  const timeEstimate = weeklyHours <= 2 
    ? "3-4 meses"
    : weeklyHours <= 5 
    ? "2-3 meses"
    : "6-8 semanas";

  message += ` Con ${weeklyHours} horas semanales, completarás este roadmap en aproximadamente ${timeEstimate} de práctica consistente.`;

  return message;
}

/**
 * Get barrier-specific reassurance message
 * @param barriers - Array of barrier identifiers
 * @returns Reassurance message addressing barriers
 */
export function getBarrierReassurance(barriers: string[]): string {
  const barrierResponses: Record<string, string> = {
    direccion: "Este roadmap te da el paso 1, 2, 3 exacto para que no tengas que adivinar por dónde empezar.",
    tecnico: "NO necesitas saber programar. Todo lo que te recomiendo es no-code y accesible para cualquier persona.",
    tiempo: "Este roadmap se adapta a las horas que tienes disponibles. Es alcanzable con práctica consistente.",
    aplicacion: "Cada recurso incluye ejemplos específicos para tu contexto. Es aplicado a tu realidad, no teoría abstracta.",
    velocidad: "Nos enfocamos en fundamentos que NO cambian. Aprenderás a adaptarte cuando surjan nuevas herramientas.",
    ninguna: "¡Excelente que estés comenzando sin frustraciones! Vamos a mantener ese momentum.",
  };

  if (barriers.length === 0 || barriers.includes("ninguna")) {
    return barrierResponses.ninguna;
  }

  // Return message for the first barrier (most important)
  return barrierResponses[barriers[0]] || barrierResponses.direccion;
}

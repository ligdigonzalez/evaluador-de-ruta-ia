// Assessment questions data for AprendeIA Learning Path Evaluator
// All text in Spanish for the target audience

export interface QuestionOption {
  id: string;
  text: string;
  // For scoring - can be level score, context value, etc.
  value: string | number;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  type: 'radio' | 'checkbox';
  options: QuestionOption[];
  // For checkbox questions
  maxSelections?: number;
  minSelections?: number;
}

export const questions: Question[] = [
  // QUESTION 1: Current Knowledge Level
  {
    id: 1,
    category: "Nivel",
    question: "¿Cuánto sabes sobre IA hoy?",
    type: "radio",
    options: [
      { id: "1a", text: "Casi nada, estoy empezando desde cero", value: 0 },
      { id: "1b", text: "He escuchado sobre ChatGPT, Gemini o similar pero no lo uso regularmente", value: 1 },
      { id: "1c", text: "Uso ChatGPT, Gemini o similar ocasionalmente para algunas tareas", value: 2 },
      { id: "1d", text: "Uso ChatGPT, Gemini o similar + otras herramientas de IA con frecuencia", value: 3 },
      { id: "1e", text: "He implementado automatizaciones o asistentes de IA", value: 4 },
    ],
  },
  // QUESTION 2: Tools Experience
  {
    id: 2,
    category: "Nivel",
    question: "¿Has usado alguna de estas herramientas de IA?",
    type: "checkbox",
    minSelections: 0,
    options: [
      { id: "2a", text: "ChatGPT / Claude / Gemini", value: "chatgpt" },
      { id: "2b", text: "Midjourney / DALL-E / Stable Diffusion", value: "imagen" },
      { id: "2c", text: "Notion AI", value: "notion" },
      { id: "2d", text: "Jasper / Copy.ai", value: "copywriting" },
      { id: "2e", text: "Make.com / Zapier con IA", value: "automation" },
      { id: "2f", text: "Ninguna de las anteriores", value: "none" },
    ],
  },
  // QUESTION 3: Prompt Experience
  {
    id: 3,
    category: "Nivel",
    question: "¿Qué describe mejor tu experiencia con prompts?",
    type: "radio",
    options: [
      { id: "3a", text: "¿Qué es un prompt? No sé de qué hablas", value: 0 },
      { id: "3b", text: "Escribo preguntas simples pero no sé cómo mejorar resultados", value: 0.5 },
      { id: "3c", text: "Conozco algunos trucos pero no tengo estrategia clara", value: 1 },
      { id: "3d", text: "Uso técnicas avanzadas (contexto, ejemplos, iteración)", value: 2 },
    ],
  },
  // QUESTION 4: Current Situation/Context
  {
    id: 4,
    category: "Contexto",
    question: "¿Qué describe mejor tu situación actual?",
    type: "radio",
    options: [
      { id: "4a", text: "Empleado en empresa (quiero ser más eficiente)", value: "empleado" },
      { id: "4b", text: "Freelancer o consultor independiente", value: "freelancer" },
      { id: "4c", text: "Emprendedor con negocio establecido", value: "emprendedor" },
      { id: "4d", text: "Emprendedor early-stage", value: "emprendedor-early" },
      { id: "4e", text: "Estudiante o en transición de carrera", value: "estudiante" },
      { id: "4f", text: "Creador de contenido / Influencer", value: "creador" },
    ],
  },
  // QUESTION 5: Main Pain Point
  {
    id: 5,
    category: "Contexto",
    question: "¿Qué área de tu trabajo consume más tiempo?",
    type: "radio",
    options: [
      { id: "5a", text: "Crear contenido (posts, emails, artículos, videos)", value: "contenido" },
      { id: "5b", text: "Responder mensajes y emails de clientes", value: "comunicacion" },
      { id: "5c", text: "Tareas administrativas (facturas, reportes, documentación)", value: "admin" },
      { id: "5d", text: "Investigación y análisis de información", value: "investigacion" },
      { id: "5e", text: "Diseño y creación visual", value: "diseno" },
      { id: "5f", text: "Planificación y estrategia", value: "estrategia" },
    ],
  },
  // QUESTION 6: Goals
  {
    id: 6,
    category: "Objetivos",
    question: "¿Qué quieres lograr aprendiendo IA?",
    type: "checkbox",
    maxSelections: 2,
    minSelections: 1,
    options: [
      { id: "6a", text: "Ser más productivo en mi trabajo actual", value: "productividad" },
      { id: "6b", text: "Automatizar tareas repetitivas", value: "automatizacion" },
      { id: "6c", text: "Crear contenido más rápido y mejor", value: "contenido" },
      { id: "6d", text: "Diferenciarme en mi industria", value: "diferenciacion" },
      { id: "6e", text: "Reducir costos de operación", value: "costos" },
      { id: "6f", text: "Escalar mi negocio sin contratar más", value: "escalabilidad" },
      { id: "6g", text: "Cambiar de carrera a roles más tecnológicos", value: "carrera" },
    ],
  },
  // QUESTION 7: Timeline for Results
  {
    id: 7,
    category: "Objetivos",
    question: "¿En cuánto tiempo quieres ver resultados prácticos?",
    type: "radio",
    options: [
      { id: "7a", text: "En 1-2 semanas (necesito algo rápido)", value: "alta" },
      { id: "7b", text: "En 1 mes (quiero avanzar pronto)", value: "media" },
      { id: "7c", text: "En 2-3 meses (construyendo base sólida)", value: "baja" },
      { id: "7d", text: "Sin prisa, quiero dominar a fondo", value: "ninguna" },
    ],
  },
  // QUESTION 8: Time Availability
  {
    id: 8,
    category: "Tiempo",
    question: "¿Cuántas horas por semana puedes dedicar a aprender IA?",
    type: "radio",
    options: [
      { id: "8a", text: "1-2 horas/semana (muy poco tiempo)", value: 1.5 },
      { id: "8b", text: "3-5 horas/semana (dedicación moderada)", value: 4 },
      { id: "8c", text: "6-10 horas/semana (dedicación alta)", value: 8 },
      { id: "8d", text: "10+ horas/semana (full foco)", value: 12 },
    ],
  },
  // QUESTION 9: Learning Style
  {
    id: 9,
    category: "Estilo",
    question: "¿Cómo prefieres aprender?",
    type: "radio",
    options: [
      { id: "9a", text: "Viendo videos tutoriales paso a paso", value: "visual" },
      { id: "9b", text: "Haciendo proyectos prácticos (hands-on)", value: "practico" },
      { id: "9c", text: "Leyendo guías y documentación", value: "lectura" },
      { id: "9d", text: "Combinación de todo lo anterior", value: "mixto" },
    ],
  },
  // QUESTION 10: Barriers
  {
    id: 10,
    category: "Barreras",
    question: "¿Qué te ha impedido aprender IA hasta ahora?",
    type: "checkbox",
    minSelections: 1,
    options: [
      { id: "10a", text: "No sé por dónde empezar (abrumación)", value: "direccion" },
      { id: "10b", text: "Pienso que necesito saber programar", value: "tecnico" },
      { id: "10c", text: "No tengo tiempo suficiente", value: "tiempo" },
      { id: "10d", text: "No veo cómo aplicarlo a mi contexto", value: "aplicacion" },
      { id: "10e", text: "Todo cambia muy rápido", value: "velocidad" },
      { id: "10f", text: "Es mi primer intento, nada me ha impedido", value: "ninguna" },
    ],
  },
];

// Category icons for visual display
export const categoryIcons: Record<string, string> = {
  "Nivel": "📊",
  "Contexto": "🎯",
  "Objetivos": "🚀",
  "Tiempo": "⏰",
  "Estilo": "📚",
  "Barreras": "🧱",
};

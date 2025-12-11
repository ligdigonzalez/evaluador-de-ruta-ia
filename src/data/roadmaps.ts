// Personalized roadmap data for AprendeIA Learning Path Evaluator
// Contains 4 primary profiles with 3-phase learning paths

export interface VideoResource {
  title: string;
  duration?: string;
  url?: string;
}

export interface Phase {
  number: number;
  title: string;
  duration: string;
  objective: string;
  skills: string[];
  resources: VideoResource[];
  project: string;
  estimatedTime: string;
}

export interface Roadmap {
  id: string;
  profileName: string;
  profileDescription: string;
  phases: Phase[];
  firstStep: {
    video: string;
    duration: string;
    action: string;
    url?: string;
  };
  recommendedCourse: {
    name: string;
    duration: string;
    launchDate: string;
    description: string;
  };
}

// Barrier-specific motivational messages
export const barrierMessages: Record<string, string> = {
  direccion: "Entiendo la abrumación. Este roadmap te da el paso 1, 2, 3 exacto para que no tengas que adivinar.",
  tecnico: "Buenas noticias: NO necesitas saber programar. Todo lo que te recomiendo es no-code y accesible.",
  tiempo: "Este roadmap se adapta a tus horas semanales disponibles. Es completamente alcanzable con práctica consistente.",
  aplicacion: "Cada recurso incluye ejemplos específicos para tu contexto. No es teoría abstracta, es aplicado a tu realidad.",
  velocidad: "Nos enfocamos en fundamentos que NO cambian. Aprenderás a adaptarte cuando surjan nuevas herramientas.",
  ninguna: "¡Qué bueno que estás comenzando sin frustraciones previas! Vamos a asegurarnos de que este sea un recorrido productivo y realista.",
};

// Level descriptions
export const levelDescriptions: Record<string, string> = {
  NOVATO: "Estás empezando tu viaje con IA. Perfecto, comenzaremos desde lo fundamental.",
  BASICO: "Tienes exposición inicial a IA. Vamos a construir sobre esa base.",
  INTERMEDIO: "Ya usas IA regularmente. Vamos a optimizar y profundizar tus habilidades.",
  AVANZADO: "Tienes experiencia práctica sólida. Vamos a llevar tus habilidades al siguiente nivel.",
};

// Main roadmaps data
export const roadmaps: Record<string, Roadmap> = {
  // PROFILE 1: Freelancer + Novato + Contenido
  "freelancer-contenido": {
    id: "freelancer-contenido",
    profileName: "Freelancer Creador de Contenido",
    profileDescription: "Eres freelancer comenzando con IA y tu mayor desafío es crear contenido de calidad de forma más eficiente.",
    phases: [
      {
        number: 1,
        title: "Fundamentos de IA para Creación de Contenido",
        duration: "Semanas 1-2",
        objective: "Dominar ChatGPT/Claude para crear contenido 3x más rápido",
        skills: [
          "Escribir prompts efectivos para contenido",
          "Estructurar conversaciones con IA",
          "Iterar y refinar outputs",
          "Adaptar tono y estilo",
        ],
        resources: [
          { title: "Desmitificando la IA: Guía Práctica para Tu Negocio", duration: "15 min" },
          { title: "Las 5 etapas para dominar la IA: De novato a experto", duration: "20 min" },
          { title: "La guía completa de asistentes de IA para profesionales", duration: "14 min" },
        ],
        project: "Crea una semana completa de contenido para redes sociales usando solo IA. Incluye: 3 posts de LinkedIn, 5 tweets, y 2 ideas de newsletter.",
        estimatedTime: "6-10 horas",
      },
      {
        number: 2,
        title: "Asistentes de IA Personalizados para Tu Contenido",
        duration: "Semanas 3-4",
        objective: "Crear asistentes especializados que escriban en tu voz y estilo",
        skills: [
          "Entrenar asistente con tu voz personal",
          "Crear templates reutilizables",
          "Generar diferentes tipos de contenido",
          "Optimizar para cada plataforma",
        ],
        resources: [
          { title: "Asistentes de IA para crear newsletters perfectos", duration: "18 min" },
          { title: "Construyendo un escritor de Newsletters personalizado", duration: "22 min" },
          { title: "Construyendo un escritor de guiones personalizado", duration: "20 min" },
        ],
        project: "Crea 2 asistentes personalizados: uno para posts de redes sociales y otro para newsletters. Entrena cada uno con 5-7 ejemplos de tu contenido anterior.",
        estimatedTime: "8-12 horas",
      },
      {
        number: 3,
        title: "Automatización Completa de Contenido",
        duration: "Mes 2-3",
        objective: "Sistema automatizado que genera y programa contenido con mínima intervención",
        skills: [
          "Conectar herramientas con Make/Zapier",
          "Crear workflows automatizados",
          "Integrar calendario de contenido",
          "Mantener calidad con supervisión mínima",
        ],
        resources: [
          { title: "De IA en chat a IA integrada: aumenta tu productividad", duration: "25 min" },
          { title: "Automatización con IA: Guía para profesionales", duration: "30 min" },
          { title: "Construyendo un Estratega de Instagram", duration: "22 min" },
        ],
        project: "Crea un sistema que genere automáticamente: borrador de newsletter semanal + 5 posts de redes sociales, todo basado en un tema que tú defines al inicio de cada semana.",
        estimatedTime: "12-15 horas",
      },
    ],
    firstStep: {
      video: "La guía completa de asistentes de IA para profesionales",
      duration: "14 minutos",
      action: "Después de ver el video, abre ChatGPT y crea tu primer post de LinkedIn usando IA. Tómate 30 minutos para experimentar.",
    },
    recommendedCourse: {
      name: "Asistentes de IA para Freelancers",
      duration: "6 semanas",
      launchDate: "2026",
      description: "Aprenderás a crear: asistente de newsletters, escritor de guiones, generador de propuestas, estratega de Instagram, y flujo completo automatizado.",
    },
  },

  // PROFILE 2: Emprendedor + Comunicación
  "emprendedor-comunicacion": {
    id: "emprendedor-comunicacion",
    profileName: "Emprendedor con Foco en Atención al Cliente",
    profileDescription: "Eres emprendedor con conocimiento básico de IA y necesitas automatizar la atención al cliente para escalar tu negocio.",
    phases: [
      {
        number: 1,
        title: "Fundamentos de Asistentes Conversacionales",
        duration: "Semanas 1-2",
        objective: "Entender cómo funcionan los asistentes de IA y diseñar tu estrategia",
        skills: [
          "Mapear flujo de atención al cliente",
          "Identificar preguntas frecuentes",
          "Diseñar experiencia conversacional",
          "Establecer límites del asistente",
        ],
        resources: [
          { title: "La guía completa de asistentes de IA para profesionales", duration: "14 min" },
          { title: "Las 5 etapas para dominar la IA: De novato a experto", duration: "20 min" },
          { title: "Desmitificando la IA: Guía Práctica para Tu Negocio", duration: "15 min" },
        ],
        project: "Documenta las 10-15 preguntas más frecuentes que recibes de clientes. Agrúpalas por categoría y escribe respuestas ideales para cada una.",
        estimatedTime: "6-10 horas",
      },
      {
        number: 2,
        title: "Construyendo Tu Primer Asistente de Atención",
        duration: "Semanas 3-5",
        objective: "Crear chatbot funcional que responda preguntas frecuentes de forma natural",
        skills: [
          "Entrenar asistente con tus FAQs",
          "Crear flujos conversacionales",
          "Manejar casos especiales",
          "Personalizar tono y voz de marca",
        ],
        resources: [
          { title: "AGENTES IA: el salto de automatización a autonomía total", duration: "28 min" },
          { title: "Flujo que genera borradores de respuestas a correos", duration: "18 min" },
        ],
        project: "Crea un asistente que pueda responder correctamente al menos 5 de tus preguntas frecuentes. Pruébalo con 10 variaciones de cada pregunta.",
        estimatedTime: "10-15 horas",
      },
      {
        number: 3,
        title: "Integración y Escalabilidad",
        duration: "Mes 2-3",
        objective: "Asistente integrado con WhatsApp/Email/Web respondiendo clientes reales",
        skills: [
          "Integrar con canales de comunicación",
          "Monitorear conversaciones",
          "Mejorar basado en interacciones reales",
          "Escalar a más casos de uso",
        ],
        resources: [
          { title: "Domina los flujos de trabajo multiagentes", duration: "32 min" },
          { title: "De IA en chat a IA integrada: aumenta tu productividad", duration: "25 min" },
        ],
        project: "Integra tu asistente con al menos un canal real (WhatsApp o formulario web). Déjalo responder clientes reales por 1 semana mientras monitoreas.",
        estimatedTime: "12-18 horas",
      },
    ],
    firstStep: {
      video: "Desmitificando la IA: Guía Práctica para Tu Negocio",
      duration: "15 minutos",
      action: "Después del video, abre un documento y escribe las 10 preguntas más frecuentes que recibes de clientes. Este será el fundamento de tu asistente.",
    },
    recommendedCourse: {
      name: "Tu Primer Asistente de Atención al Cliente con IA",
      duration: "6 semanas",
      launchDate: "2026",
      description: "Sistema completo: desde diseño de flujo hasta asistente funcional integrado con WhatsApp/Email/Web.",
    },
  },

  // PROFILE 3: Empleado + Productividad
  "empleado-productividad": {
    id: "empleado-productividad",
    profileName: "Empleado Buscando Destacar",
    profileDescription: "Trabajas en una empresa y ya usas IA ocasionalmente. Quieres destacar siendo más eficiente y proponer mejoras innovadoras.",
    phases: [
      {
        number: 1,
        title: "Optimización Diaria con IA",
        duration: "Semanas 1-2",
        objective: "Integrar IA en tu flujo de trabajo diario para ser 2x más productivo",
        skills: [
          "Prompts avanzados para análisis",
          "Automatizar tareas repetitivas",
          "Investigación rápida con IA",
          "Síntesis de información compleja",
        ],
        resources: [
          { title: "Automatización con IA: Guía para profesionales", duration: "30 min" },
          { title: "De IA en chat a IA integrada: aumenta tu productividad", duration: "25 min" },
          { title: "Las 5 etapas para dominar la IA (etapas 3-4)", duration: "20 min" },
        ],
        project: "Identifica 3 tareas repetitivas en tu trabajo. Crea prompts o pequeñas automatizaciones para cada una. Documenta el tiempo ahorrado.",
        estimatedTime: "6-10 horas",
      },
      {
        number: 2,
        title: "Documentación Profesional con IA",
        duration: "Semanas 3-5",
        objective: "Crear documentos, reportes y presentaciones profesionales en la mitad del tiempo",
        skills: [
          "Generar SOPs (procedimientos)",
          "Crear reportes estructurados",
          "Diseñar propuestas ganadoras",
          "Documentar procesos complejos",
        ],
        resources: [
          { title: "Construyendo un generador de documentos profesionales (SOP)", duration: "20 min" },
          { title: "Construyendo un generador de propuestas ganadoras", duration: "22 min" },
          { title: "Construyendo un generador de correos fríos", duration: "18 min" },
        ],
        project: "Crea 3 documentos profesionales con asistentes de IA: 1 SOP de un proceso de tu área, 1 reporte mensual, y 1 propuesta interna.",
        estimatedTime: "8-12 horas",
      },
      {
        number: 3,
        title: "Propuesta de Valor: IA en Tu Empresa",
        duration: "Mes 2-3",
        objective: "Presentar caso de negocio de IA a tu jefe/equipo con ROI calculado",
        skills: [
          "Calcular ROI de automatizaciones",
          "Presentar casos de uso convincentes",
          "Proponer pilotos de bajo riesgo",
          "Liderar implementación de IA",
        ],
        resources: [
          { title: "Construyendo un Estratega de Negocio", duration: "25 min" },
          { title: "AGENTES IA: el salto de automatización a autonomía total", duration: "28 min" },
        ],
        project: "Crea presentación profesional con: 3 casos de uso de IA para tu departamento, ROI estimado, propuesta de piloto de 90 días.",
        estimatedTime: "10-15 horas",
      },
    ],
    firstStep: {
      video: "Las 5 etapas para dominar la IA: De novato a experto",
      duration: "20 minutos",
      action: "Identifica 3 tareas repetitivas en tu trabajo de esta semana. Escríbelas y estima cuántas horas por semana gastas en cada una.",
    },
    recommendedCourse: {
      name: "IA Práctica para Destacar en Tu Trabajo",
      duration: "4-6 semanas",
      launchDate: "2026",
      description: "Portfolio completo de casos de uso aplicados, automatizaciones documentadas, y propuesta de valor para presentar a tu empresa.",
    },
  },

  // PROFILE 4: Estudiante + Aprendizaje General
  "estudiante-general": {
    id: "estudiante-general",
    profileName: "Estudiante en Transición",
    profileDescription: "Eres estudiante o estás en transición de carrera. Quieres dominar IA para diferenciarte profesionalmente, pero tienes presupuesto limitado.",
    phases: [
      {
        number: 1,
        title: "Exploración Completa de IA (100% Gratis)",
        duration: "Semanas 1-3",
        objective: "Entender qué es IA, qué puedes hacer, y dónde enfocarte según tus intereses",
        skills: [
          "Fundamentos de IA práctica",
          "Uso básico de ChatGPT/Claude",
          "Identificar casos de uso relevantes",
          "Evaluar tu nivel de interés en cada área",
        ],
        resources: [
          { title: "Desmitificando la IA: Guía Práctica para Tu Negocio", duration: "15 min" },
          { title: "Las 5 etapas para dominar la IA: De novato a experto", duration: "20 min" },
          { title: "La guía completa de asistentes de IA para profesionales", duration: "14 min" },
          { title: "Serie completa: Inteligencia Artificial que trabaja para ti (8 videos)", duration: "~3 horas" },
        ],
        project: "Experimenta con ChatGPT gratis por 2-3 semanas. Prueba al menos 5 casos de uso diferentes: escritura, investigación, aprendizaje, generación de ideas, resolución de problemas.",
        estimatedTime: "8-12 horas",
      },
      {
        number: 2,
        title: "Aplicación Práctica - Construyendo Portfolio",
        duration: "Semanas 4-8",
        objective: "Crear 3-5 proyectos prácticos de IA que puedas mostrar en CV o entrevistas",
        skills: [
          "Replicar asistentes de la serie de 8 días",
          "Adaptar ejemplos a tu contexto",
          "Documentar aprendizajes",
          "Crear portfolio público",
        ],
        resources: [
          { title: "Playlist: Inteligencia Artificial que trabaja para ti (replica 3-4 asistentes)", duration: "~2 horas" },
          { title: "Automatización con IA: Guía para profesionales", duration: "30 min" },
          { title: "De IA en chat a IA integrada: aumenta tu productividad", duration: "25 min" },
        ],
        project: "Crea tu 'Portfolio de IA' con 3-5 proyectos: asistente de escritura, sistema de respuestas automáticas, generador de contenido, flujo de automatización, y planificador con IA.",
        estimatedTime: "15-20 horas",
      },
      {
        number: 3,
        title: "Especialización y Profundización",
        duration: "Mes 3-4",
        objective: "Elegir 1-2 áreas de IA para profundizar y considerarte 'competente'",
        skills: [
          "Dominio profundo de área elegida",
          "Entender limitaciones y ética",
          "Mantenerse actualizado",
          "Contribuir a comunidad",
        ],
        resources: [
          { title: "Las 5 etapas para dominar la IA (etapas 4-5)", duration: "20 min" },
          { title: "AGENTES IA: el salto de automatización a autonomía total", duration: "28 min" },
          { title: "Domina los flujos de trabajo multiagentes", duration: "32 min" },
        ],
        project: "Proyecto capstone que combine múltiples habilidades: sistema completo de generación + programación + análisis, o chatbot completo con múltiples flujos.",
        estimatedTime: "15-25 horas",
      },
    ],
    firstStep: {
      video: "Desmitificando la IA: Guía Práctica para Tu Negocio",
      duration: "15 minutos",
      action: "Crea cuenta gratuita de ChatGPT (si no la tienes). Después del video, experimenta 30 minutos con 3 casos de uso que te interesen.",
    },
    recommendedCourse: {
      name: "Comunidad AprendeIA - Membresía Mensual",
      duration: "Ongoing",
      launchDate: "2026",
      description: "Tutorial nuevo cada mes, Q&A en vivo con Ligdi, comunidad de práctica, biblioteca de recursos, descuento 20% en cursos completos. Inversión: ~$29-49/mes.",
    },
  },
};

// Default/fallback roadmap for combinations not explicitly defined
export const defaultRoadmap: Roadmap = {
  id: "default",
  profileName: "Profesional en Aprendizaje de IA",
  profileDescription: "Basado en tus respuestas, hemos creado un roadmap personalizado para ayudarte a dominar las herramientas de IA más relevantes para tu situación.",
  phases: [
    {
      number: 1,
      title: "Fundamentos de IA Práctica",
      duration: "Semanas 1-2",
      objective: "Dominar las bases de ChatGPT y otras herramientas de IA para uso diario",
      skills: [
        "Escribir prompts efectivos",
        "Entender las capacidades y límites de la IA",
        "Aplicar IA a tareas cotidianas",
        "Desarrollar pensamiento crítico sobre outputs",
      ],
      resources: [
        { title: "Desmitificando la IA: Guía Práctica para Tu Negocio", duration: "15 min" },
        { title: "Las 5 etapas para dominar la IA: De novato a experto", duration: "20 min" },
        { title: "La guía completa de asistentes de IA para profesionales", duration: "14 min" },
      ],
      project: "Identifica 3 tareas de tu día a día y resuelve cada una usando IA. Documenta el proceso y los resultados.",
      estimatedTime: "6-10 horas",
    },
    {
      number: 2,
      title: "Asistentes Personalizados",
      duration: "Semanas 3-4",
      objective: "Crear asistentes de IA que se adapten a tus necesidades específicas",
      skills: [
        "Diseñar asistentes con contexto personalizado",
        "Crear templates reutilizables",
        "Iterar y mejorar outputs",
        "Integrar IA en flujos de trabajo",
      ],
      resources: [
        { title: "Construyendo un Estratega de Negocio", duration: "25 min" },
        { title: "Automatización con IA: Guía para profesionales", duration: "30 min" },
      ],
      project: "Crea 2 asistentes personalizados para las tareas que más tiempo te consumen.",
      estimatedTime: "8-12 horas",
    },
    {
      number: 3,
      title: "Automatización y Escalabilidad",
      duration: "Mes 2-3",
      objective: "Conectar herramientas y crear sistemas que trabajen para ti",
      skills: [
        "Conectar aplicaciones con Make/Zapier",
        "Crear workflows automatizados",
        "Monitorear y optimizar sistemas",
        "Escalar soluciones",
      ],
      resources: [
        { title: "De IA en chat a IA integrada: aumenta tu productividad", duration: "25 min" },
        { title: "AGENTES IA: el salto de automatización a autonomía total", duration: "28 min" },
      ],
      project: "Crea un workflow automatizado que conecte al menos 2 herramientas y te ahorre tiempo cada semana.",
      estimatedTime: "12-15 horas",
    },
  ],
  firstStep: {
    video: "La guía completa de asistentes de IA para profesionales",
    duration: "14 minutos",
    action: "Después del video, experimenta 30 minutos con ChatGPT aplicándolo a una tarea real de tu trabajo.",
  },
  recommendedCourse: {
    name: "Curso Integral de IA Práctica",
    duration: "6 semanas",
    launchDate: "2026",
    description: "Programa completo que te llevará de principiante a usuario avanzado con proyectos prácticos y mentoría.",
  },
};

export interface Pregunta {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
}

export interface Respuesta {
  pregunta: string;
  respuesta: string;
  esCorrecta: boolean;
}

// Nuevos tipos para preguntas de opción múltiple
export interface OpcionMultiple {
  texto: string;
  esCorrecta: boolean;
}

export interface PreguntaMultipleChoice {
  pregunta: string;
  opciones: OpcionMultiple[];
} 
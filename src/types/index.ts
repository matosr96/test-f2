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
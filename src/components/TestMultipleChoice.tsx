import React, { useState, useEffect } from 'react';
import { preguntas } from '../data/organizacion';
import type { Respuesta, PreguntaMultipleChoice } from '../types';
import './TestComponent.css';

interface TestMultipleChoiceProps {
  tipoTest: 'fisica' | 'organizacion';
  onVolver: () => void;
}

const TestMultipleChoice: React.FC<TestMultipleChoiceProps> = ({ tipoTest, onVolver }) => {
  const [preguntasAleatorias, setPreguntasAleatorias] = useState<PreguntaMultipleChoice[]>([]);
  const [preguntaActual, setPreguntaActual] = useState<number>(0);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [testCompletado, setTestCompletado] = useState<boolean>(false);
  const [tiempoRestante, setTiempoRestante] = useState<number>(1800); // 30 minutos en segundos

  // Función para aleatorizar el array de preguntas
  const aleatorizarPreguntas = (preguntas: PreguntaMultipleChoice[]): PreguntaMultipleChoice[] => {
    const preguntasCopia = [...preguntas];
    for (let i = preguntasCopia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [preguntasCopia[i], preguntasCopia[j]] = [preguntasCopia[j], preguntasCopia[i]];
    }
    return preguntasCopia;
  };

  // Inicializar preguntas aleatorias al montar el componente
  useEffect(() => {
    setPreguntasAleatorias(aleatorizarPreguntas(preguntas));
  }, []);

  useEffect(() => {
    if (tiempoRestante > 0 && !testCompletado) {
      const timer = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (tiempoRestante === 0 && !testCompletado) {
      finalizarTest();
    }
  }, [tiempoRestante, testCompletado]);

  const manejarRespuesta = (respuesta: string): void => {
    const preguntaActualData = preguntasAleatorias[preguntaActual];
    const opcionSeleccionada = preguntaActualData.opciones.find(opcion => opcion.texto === respuesta);
    const esCorrecta = opcionSeleccionada?.esCorrecta || false;
    
    setRespuestas([...respuestas, { 
      pregunta: preguntaActualData.pregunta,
      respuesta,
      esCorrecta
    }]);
    setMostrarResultado(true);

    setTimeout(() => {
      setMostrarResultado(false);
      if (preguntaActual < preguntasAleatorias.length - 1) {
        setPreguntaActual(preguntaActual + 1);
      } else {
        finalizarTest();
      }
    }, 1500);
  };

  const finalizarTest = (): void => {
    setTestCompletado(true);
  };

  const reiniciarTest = (): void => {
    setPreguntasAleatorias(aleatorizarPreguntas(preguntas));
    setPreguntaActual(0);
    setRespuestas([]);
    setMostrarResultado(false);
    setTestCompletado(false);
    setTiempoRestante(1800);
  };

  const respuestasCorrectas = respuestas.filter(r => r.esCorrecta).length;
  const respuestasIncorrectas = respuestas.filter(r => !r.esCorrecta).length;

  const formatearTiempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  if (testCompletado) {
    return (
      <div className="test-container">
        <h2>Test de {tipoTest === 'fisica' ? 'Física' : 'Organización'} Completado</h2>
        <div className="resultados">
          <p>Respuestas correctas: {respuestasCorrectas}</p>
          <p>Respuestas incorrectas: {respuestasIncorrectas}</p>
          <p>Porcentaje de aciertos: {((respuestasCorrectas / preguntasAleatorias.length) * 100).toFixed(2)}%</p>
        </div>
        <div className="botones-resultado">
          <button onClick={reiniciarTest} className="reiniciar-btn">
            Reiniciar Test
          </button>
          <button onClick={onVolver} className="volver-btn">
            Volver al Menú
          </button>
        </div>
      </div>
    );
  }

  // Si aún no se han cargado las preguntas aleatorias
  if (preguntasAleatorias.length === 0) {
    return <div className="test-container">Cargando...</div>;
  }

  return (
    <div className="test-container">
      <div className="header-test">
        <button onClick={onVolver} className="volver-menu-btn">
          ← Volver al Menú
        </button>
        <h2>Test de {tipoTest === 'fisica' ? 'Física' : 'Organización'}</h2>
      </div>
      <div className="tiempo-restante">
        Tiempo restante: {formatearTiempo(tiempoRestante)}
      </div>
      <div className="progreso">
        Pregunta {preguntaActual + 1} de {preguntasAleatorias.length}
      </div>
      <div className="pregunta-container">
        <h3>{preguntasAleatorias[preguntaActual].pregunta}</h3>
        <div className="opciones">
          {preguntasAleatorias[preguntaActual].opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => manejarRespuesta(opcion.texto)}
              disabled={mostrarResultado}
              className={`opcion-btn ${mostrarResultado ? 'disabled' : ''}`}
            >
              {opcion.texto}
            </button>
          ))}
        </div>
        {mostrarResultado && (
          <div className={`resultado ${respuestas[respuestas.length - 1].esCorrecta ? 'correcto' : 'incorrecto'}`}>
            {respuestas[respuestas.length - 1].esCorrecta ? '¡Correcto!' : 'Incorrecto'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestMultipleChoice; 
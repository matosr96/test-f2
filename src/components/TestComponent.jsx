import React, { useState, useEffect } from 'react';
import { preguntas } from '../data/preguntas';
import './TestComponent.css';

const TestComponent = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [testCompletado, setTestCompletado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(1800); // 30 minutos en segundos

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

  const manejarRespuesta = (respuesta) => {
    const esCorrecta = respuesta === preguntas[preguntaActual].respuestaCorrecta;
    setRespuestas([...respuestas, { 
      pregunta: preguntas[preguntaActual].pregunta,
      respuesta,
      esCorrecta
    }]);
    setMostrarResultado(true);

    setTimeout(() => {
      setMostrarResultado(false);
      if (preguntaActual < preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1);
      } else {
        finalizarTest();
      }
    }, 1500);
  };

  const finalizarTest = () => {
    setTestCompletado(true);
  };

  const reiniciarTest = () => {
    setPreguntaActual(0);
    setRespuestas([]);
    setMostrarResultado(false);
    setTestCompletado(false);
    setTiempoRestante(1800);
  };

  const respuestasCorrectas = respuestas.filter(r => r.esCorrecta).length;
  const respuestasIncorrectas = respuestas.filter(r => !r.esCorrecta).length;

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  if (testCompletado) {
    return (
      <div className="test-container">
        <h2>Test Completado</h2>
        <div className="resultados">
          <p>Respuestas correctas: {respuestasCorrectas}</p>
          <p>Respuestas incorrectas: {respuestasIncorrectas}</p>
          <p>Porcentaje de aciertos: {((respuestasCorrectas / preguntas.length) * 100).toFixed(2)}%</p>
        </div>
        <button onClick={reiniciarTest} className="reiniciar-btn">
          Reiniciar Test
        </button>
      </div>
    );
  }

  return (
    <div className="test-container">
      <div className="tiempo-restante">
        Tiempo restante: {formatearTiempo(tiempoRestante)}
      </div>
      <div className="progreso">
        Pregunta {preguntaActual + 1} de {preguntas.length}
      </div>
      <div className="pregunta-container">
        <h3>{preguntas[preguntaActual].pregunta}</h3>
        <div className="opciones">
          {preguntas[preguntaActual].opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => manejarRespuesta(opcion)}
              disabled={mostrarResultado}
              className={`opcion-btn ${mostrarResultado ? 'disabled' : ''}`}
            >
              {opcion}
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

export default TestComponent; 
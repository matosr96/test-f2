"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { preguntas } from "../data/organizacion"
import type { Respuesta, PreguntaMultipleChoice } from "../types"
import styles from "./TestComponent.module.css"

interface TestMultipleChoiceProps {
  tipoTest: "fisica" | "organizacion"
  onVolver: () => void
}

const TestMultipleChoice: React.FC<TestMultipleChoiceProps> = ({ tipoTest, onVolver }) => {
  const [preguntasAleatorias, setPreguntasAleatorias] = useState<PreguntaMultipleChoice[]>([])
  const [preguntaActual, setPreguntaActual] = useState<number>(0)
  const [respuestas, setRespuestas] = useState<Respuesta[]>([])
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false)
  const [testCompletado, setTestCompletado] = useState<boolean>(false)
  const [tiempoRestante, setTiempoRestante] = useState<number>(1800)

  const aleatorizarPreguntas = (preguntas: PreguntaMultipleChoice[]): PreguntaMultipleChoice[] => {
    const preguntasCopia = [...preguntas]
    for (let i = preguntasCopia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[preguntasCopia[i], preguntasCopia[j]] = [preguntasCopia[j], preguntasCopia[i]]
    }
    return preguntasCopia
  }

  useEffect(() => {
    setPreguntasAleatorias(aleatorizarPreguntas(preguntas))
  }, [])

  useEffect(() => {
    if (tiempoRestante > 0 && !testCompletado) {
      const timer = setInterval(() => {
        setTiempoRestante((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (tiempoRestante === 0 && !testCompletado) {
      finalizarTest()
    }
  }, [tiempoRestante, testCompletado])

  const manejarRespuesta = (respuesta: string): void => {
    const preguntaActualData = preguntasAleatorias[preguntaActual]
    const opcionSeleccionada = preguntaActualData.opciones.find((opcion) => opcion.texto === respuesta)
    const esCorrecta = opcionSeleccionada?.esCorrecta || false

    setRespuestas([
      ...respuestas,
      {
        pregunta: preguntaActualData.pregunta,
        respuesta,
        esCorrecta,
      },
    ])
    setMostrarResultado(true)

    setTimeout(() => {
      setMostrarResultado(false)
      if (preguntaActual < preguntasAleatorias.length - 1) {
        setPreguntaActual(preguntaActual + 1)
      } else {
        finalizarTest()
      }
    }, 1500)
  }

  const finalizarTest = (): void => {
    setTestCompletado(true)
  }

  const reiniciarTest = (): void => {
    setPreguntasAleatorias(aleatorizarPreguntas(preguntas))
    setPreguntaActual(0)
    setRespuestas([])
    setMostrarResultado(false)
    setTestCompletado(false)
    setTiempoRestante(1800)
  }

  const respuestasCorrectas = respuestas.filter((r) => r.esCorrecta).length
  const respuestasIncorrectas = respuestas.filter((r) => !r.esCorrecta).length

  const formatearTiempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60)
    const segs = segundos % 60
    return `${minutos.toString().padStart(2, "0")}:${segs.toString().padStart(2, "0")}`
  }

  if (testCompletado) {
    return (
      <div className={styles.container}>
        <div className={styles.resultadosCard}>
          <div className={styles.resultadosHeader}>
            <div className={styles.iconoCompletado}>🎉</div>
            <h2 className={styles.tituloCompletado}>
              Test de {tipoTest === "fisica" ? "Física" : "Organización"} Completado
            </h2>
          </div>

          <div className={styles.estadisticas}>
            <div className={styles.estadistica}>
              <div className={styles.numeroEstadistica}>{respuestasCorrectas}</div>
              <div className={styles.labelEstadistica}>Correctas</div>
            </div>
            <div className={styles.estadistica}>
              <div className={styles.numeroEstadistica}>{respuestasIncorrectas}</div>
              <div className={styles.labelEstadistica}>Incorrectas</div>
            </div>
            <div className={styles.estadistica}>
              <div className={styles.numeroEstadistica}>
                {((respuestasCorrectas / preguntasAleatorias.length) * 100).toFixed(0)}%
              </div>
              <div className={styles.labelEstadistica}>Aciertos</div>
            </div>
          </div>

          <div className={styles.botonesResultado}>
            <button onClick={reiniciarTest} className={styles.botonReiniciar}>
              Reiniciar Test
            </button>
            <button onClick={onVolver} className={styles.botonVolver}>
              Volver al Menú
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (preguntasAleatorias.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.cargando}>
          <div className={styles.spinner}></div>
          <p>Cargando preguntas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onVolver} className={styles.botonVolver}>
          ← Volver al Menú
        </button>
        <h1 className={styles.titulo}>Test de {tipoTest === "fisica" ? "Física" : "Organización"}</h1>
        <div className={styles.tiempoRestante}>{formatearTiempo(tiempoRestante)}</div>
      </div>

      <div className={styles.progreso}>
        <div className={styles.barraProgreso}>
          <div
            className={styles.progresoFill}
            style={{ width: `${((preguntaActual + 1) / preguntasAleatorias.length) * 100}%` }}
          ></div>
        </div>
        <span className={styles.textoProgreso}>
          Pregunta {preguntaActual + 1} de {preguntasAleatorias.length}
        </span>
      </div>

      <div className={styles.preguntaCard}>
        <h3 className={styles.pregunta}>{preguntasAleatorias[preguntaActual].pregunta}</h3>

        <div className={styles.opciones}>
          {preguntasAleatorias[preguntaActual].opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => manejarRespuesta(opcion.texto)}
              disabled={mostrarResultado}
              className={`${styles.opcionBtn} ${mostrarResultado ? styles.disabled : ""}`}
            >
              <span className={styles.letraOpcion}>{String.fromCharCode(65 + index)}</span>
              {opcion.texto}
            </button>
          ))}
        </div>

        {mostrarResultado && (
          <div
            className={`${styles.resultado} ${respuestas[respuestas.length - 1].esCorrecta ? styles.correcto : styles.incorrecto}`}
          >
            <div className={styles.iconoResultado}>{respuestas[respuestas.length - 1].esCorrecta ? "✓" : "✗"}</div>
            <span>{respuestas[respuestas.length - 1].esCorrecta ? "¡Correcto!" : "Incorrecto"}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestMultipleChoice

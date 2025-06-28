"use client"

import type React from "react"
import { useState } from "react"
import TestComponent from "./components/TestComponent"
import TestMultipleChoice from "./components/TestMultipleChoice"
import styles from "./App.module.css"

type TipoTest = "fisica" | "organizacion" | null

const App: React.FC = () => {
  const [tipoTestSeleccionado, setTipoTestSeleccionado] = useState<TipoTest>(null)

  const seleccionarTest = (tipo: TipoTest) => {
    setTipoTestSeleccionado(tipo)
  }

  const volverAlMenu = () => {
    setTipoTestSeleccionado(null)
  }

  if (tipoTestSeleccionado) {
    return (
      <div className={styles.app}>
        {tipoTestSeleccionado === "fisica" ? (
          <TestComponent onVolver={volverAlMenu} />
        ) : (
          <TestMultipleChoice tipoTest={tipoTestSeleccionado} onVolver={volverAlMenu} />
        )}
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <div className={styles.menuPrincipal}>
        <div className={styles.header}>
          <h1 className={styles.titulo}>Selecciona tu Test</h1>
          <p className={styles.subtitulo}>Elige el área de conocimiento que deseas evaluar</p>
        </div>

        <div className={styles.opcionesTest}>
          <div className={styles.opcionTest} onClick={() => seleccionarTest("fisica")}>
            <div className={styles.iconoTest}>⚡</div>
            <h2 className={styles.tituloTest}>Test de Física</h2>
            <p className={styles.descripcionTest}>Preguntas sobre electricidad, magnetismo y fuerzas</p>
            <div className={styles.arrow}>→</div>
          </div>

          <div className={styles.opcionTest} onClick={() => seleccionarTest("organizacion")}>
            <div className={styles.iconoTest}>💻</div>
            <h2 className={styles.tituloTest}>Test de Organización</h2>
            <p className={styles.descripcionTest}>Preguntas sobre arquitectura de computadores</p>
            <div className={styles.arrow}>→</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

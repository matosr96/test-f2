import React, { useState } from 'react';
import TestComponent from './components/TestComponent';
import TestMultipleChoice from './components/TestMultipleChoice';
import './App.css';

type TipoTest = 'fisica' | 'organizacion' | null;

const App: React.FC = () => {
  const [tipoTestSeleccionado, setTipoTestSeleccionado] = useState<TipoTest>(null);

  const seleccionarTest = (tipo: TipoTest) => {
    setTipoTestSeleccionado(tipo);
  };

  const volverAlMenu = () => {
    setTipoTestSeleccionado(null);
  };

  if (tipoTestSeleccionado) {
    return (
      <div className="App">
        {tipoTestSeleccionado === 'fisica' ? (
          <TestComponent onVolver={volverAlMenu} />
        ) : (
          <TestMultipleChoice tipoTest={tipoTestSeleccionado} onVolver={volverAlMenu} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="menu-principal">
        <h1>Selecciona tu Test</h1>
        <div className="opciones-test">
          <div className="opcion-test" onClick={() => seleccionarTest('fisica')}>
            <div className="icono-test">⚡</div>
            <h2>Test de Física</h2>
            <p>Preguntas sobre electricidad, magnetismo y fuerzas</p>
          </div>
          <div className="opcion-test" onClick={() => seleccionarTest('organizacion')}>
            <div className="icono-test">💻</div>
            <h2>Test de Organización</h2>
            <p>Preguntas sobre arquitectura de computadores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

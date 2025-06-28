interface Questions {
  pregunta: string;
  opciones: {
    texto: string;
    esCorrecta: boolean;
  }[];
}
export const preguntas: Questions[] = [
  {
    pregunta:
      "¿Cuáles son los principales componentes estructurales de la arquitectura de un computador?",
    opciones: [
      {
        texto:
          "Memoria, dispositivos de entrada/salida, unidad central de procesos, estructura de interconexión.",
        esCorrecta: true,
      },
      {
        texto:
          "Dispositivos de entrada/salida, estructura de interconexión, unidad de control, memoria.",
        esCorrecta: false,
      },
      {
        texto:
          "Estructura de interconexión, unidad lógica aritmética, registros.",
        esCorrecta: false,
      },
      {
        texto:
          "Unidad central de procesos, estructura de interconexión, memoria, dispositivos de E/S.",
        esCorrecta: false,
      },
    ],
  },
  {
    pregunta:
      "¿Qué generación se caracterizó por utilizar microprocesadores en las computadoras?",
    opciones: [
      { texto: "Primera.", esCorrecta: false },
      { texto: "Segunda.", esCorrecta: false },
      { texto: "Tercera.", esCorrecta: false },
      { texto: "Cuarta.", esCorrecta: true },
    ],
  },
  {
    pregunta: "El tamaño del bus de direcciones nos indica la capacidad de:",
    opciones: [
      { texto: "Transferencia.", esCorrecta: false },
      { texto: "Direccionamiento.", esCorrecta: true },
      { texto: "Almacenamiento.", esCorrecta: false },
      { texto: "Memoria.", esCorrecta: false },
    ],
  },
  {
    pregunta:
      "Cuando un bus emplea dispositivos de diferentes fabricantes, decimos que:",
    opciones: [
      { texto: "Tiene buen ancho de banda.", esCorrecta: false },
      { texto: "Es heterogéneo.", esCorrecta: true },
      { texto: "Posee baja latencia.", esCorrecta: false },
      { texto: "Es versátil.", esCorrecta: false },
    ],
  },
  {
    pregunta: "La memoria DDR es un tipo de memoria:",
    opciones: [
      { texto: "RIMM.", esCorrecta: false },
      { texto: "SRAM.", esCorrecta: false },
      { texto: "DRAM.", esCorrecta: false },
      { texto: "SDRAM.", esCorrecta: true },
    ],
  },
  {
    pregunta:
      "La propiedad que tiene la capacidad de sobrescribir la información escrita en memoria se llama:",
    opciones: [
      { texto: "Volatilidad.", esCorrecta: false },
      { texto: "Borrable.", esCorrecta: true },
      { texto: "Aleatoria.", esCorrecta: false },
      { texto: "Secuencial.", esCorrecta: false },
    ],
  },
  {
    pregunta: "Un ejemplo de memoria estática es:",
    opciones: [
      { texto: "Caché.", esCorrecta: true },
      { texto: "Blu-Ray.", esCorrecta: false },
      { texto: "Disco Duro.", esCorrecta: false },
      { texto: "Disquete.", esCorrecta: false },
    ],
  },
  {
    pregunta:
      "El microprocesador es un chip que contiene miles o millones de elementos llamados:",
    opciones: [
      { texto: "Zócalos.", esCorrecta: false },
      { texto: "Transistores.", esCorrecta: true },
      { texto: "Puertos.", esCorrecta: false },
      { texto: "Terminales en línea.", esCorrecta: false },
    ],
  },
  {
    pregunta:
      "Los procesadores actuales pueden incluir internamente los siguientes componentes, con excepción de:",
    opciones: [
      { texto: "Núcleos.", esCorrecta: false },
      { texto: "Memoria Caché.", esCorrecta: false },
      { texto: "Memoria RAM.", esCorrecta: true },
      { texto: "Unidad de coma flotante.", esCorrecta: false },
    ],
  },
  {
    pregunta:
      "El controlador DMA necesita tener el control del bus para transferir datos. La técnica que por su funcionamiento se conoce como 'parada del procesador' es:",
    opciones: [
      { texto: "Robo de ciclo.", esCorrecta: false },
      { texto: "Ráfagas.", esCorrecta: true },
      { texto: "Transparente.", esCorrecta: false },
      { texto: "Scatter gather.", esCorrecta: false },
    ],
  },
];

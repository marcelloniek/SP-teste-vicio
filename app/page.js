"use client";

import { useState } from 'react';

const preguntas = [
  "Tengo dificultad para controlar o detener hábitos o comportamientos que reconozco como perjudiciales para mi vida.",
  "Cuando intento dejar o reducir ciertos comportamientos, siento ansiedad, irritabilidad o una incomodidad emocional significativa.",
  "He tenido problemas familiares, sociales o laborales directamente relacionados con comportamientos repetitivos o adicciones.",
  "Dedico mucho tiempo pensando o planificando ciertos comportamientos, aunque sé que no son saludables.",
  "He intentado abandonar cierto comportamiento varias veces, pero siempre termino volviendo al mismo hábito compulsivamente.",
  "Recientemente, mis comportamientos compulsivos o adicciones me han llevado a pensar seriamente en quitarme la vida o hacerme daño.", // FLAG
  "Siento una vergüenza o culpa significativa debido a mis comportamientos compulsivos o adicciones.",
  "He percibido daños físicos o financieros debido a comportamientos repetitivos o adicciones.",
  "Suelo mentir u ocultar mis hábitos o adicciones a las personas cercanas por miedo al juicio o la reprimenda.",
  "Aunque reconozco que necesito ayuda, tengo mucha dificultad para pedir auxilio o admitir mi problema ante alguien."
];

export default function TestAdiccion() {
  const [respuestas, setRespuestas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  const registrarRespuesta = (valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indiceActual] = valor;
    setRespuestas(nuevasRespuestas);

    if (indiceActual < preguntas.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      calcularResultado(nuevasRespuestas);
    }
  };

  const calcularResultado = (respuestas) => {
    if (respuestas[5] >= 3) { // FLAG
      setResultado("ROJO");
    } else {
      const suma = respuestas.reduce((a, b) => a + b, 0);
      if (suma <= 20) setResultado("VERDE");
      else if (suma <= 35) setResultado("AMARILLO");
      else setResultado("ROJO");
    }
  };

  const reiniciarTest = () => {
    setRespuestas(Array(10).fill(0));
    setResultado(null);
    setIndiceActual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Test de Adicción</h2>
          <p className="mb-4">{preguntas[indiceActual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarRespuesta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Pregunta {indiceActual + 1} de {preguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Resultado: {resultado}</h2>
          {resultado === "VERDE" && <p>Manejas muy bien este tema y tienes una buena estabilidad emocional. Podrás ayudar significativamente a otras personas que necesitan apoyo.</p>}
          {resultado === "AMARILLO" && <p>Hay signos evidentes de dificultades emocionales que necesitan atención y que, con determinación y ayuda, podrán superarse.</p>}
          {resultado === "ROJO" && <p>Tus dificultades emocionales relacionadas con este tema requieren ayuda profesional inmediata. Busca rápidamente la ayuda de un médico o psicólogo.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTest}
          >
            Rehacer el test
          </button>
        </>
      )}
    </div>
  );
}
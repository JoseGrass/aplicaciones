"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function MemoryGame() {
  const gridSize = 5;
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [showing, setShowing] = useState(false);
  const [message, setMessage] = useState("Presiona 'Empezar' para jugar");
  const [round, setRound] = useState(0);

  // Mostrar la secuencia actual
  const showSequence = async () => {
    setShowing(true);
    for (let i = 0; i < sequence.length; i++) {
      setHighlighted(sequence[i]);
      await new Promise((r) => setTimeout(r, 700));
      setHighlighted(null);
      await new Promise((r) => setTimeout(r, 300));
    }
    setShowing(false);
  };

  // Iniciar el juego
  const startGame = () => {
    const first = Math.floor(Math.random() * gridSize * gridSize);
    setSequence([first]);
    setUserInput([]);
    setRound(1);
    setMessage("Observa la secuencia...");
  };

  // Mostrar la secuencia cada vez que cambie
  useEffect(() => {
    if (sequence.length > 0) {
      showSequence().then(() => setMessage("Repite la secuencia tocando los puntos"));
    }
  }, [sequence]);

  // Manejar clics del usuario
  const handleClick = (index: number) => {
    if (showing || sequence.length === 0) return;

    const newInput = [...userInput, index];
    setUserInput(newInput);

    // Si falla
    if (index !== sequence[newInput.length - 1]) {
      setMessage(`❌ Fallaste. Ronda alcanzada: ${round}`);
      setSequence([]);
      setUserInput([]);
      setRound(0);
      return;
    }

    // Si acierta toda la secuencia
    if (newInput.length === sequence.length) {
      setMessage("✅ ¡Bien hecho! Preparando nueva ronda...");
      setTimeout(() => {
        const next = Math.floor(Math.random() * gridSize * gridSize);
        setSequence([...sequence, next]);
        setUserInput([]);
        setRound((r) => r + 1);
      }, 1000);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🧠 Sigue la secuencia</h1>
      <p className={styles.round}>Ronda: {round}</p>
      <p className={styles.message}>{message}</p>

      {sequence.length === 0 && (
        <button className={styles.startButton} onClick={startGame}>
          Empezar
        </button>
      )}

      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <div
            key={i}
            className={`${styles.cell} ${
              highlighted === i
                ? styles.highlight
                : userInput.includes(i)
                ? styles.selected
                : ""
            }`}
            onClick={() => handleClick(i)}
          ></div>
        ))}
      </div>
    </main>
  );
}

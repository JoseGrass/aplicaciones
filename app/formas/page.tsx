"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

type Frase = {
  text: string;
  category: string;
  difficulty: number;
};

const frasesColombianasPool: Frase[] = [
  // Nivel Fácil (1-5)
  { text: "A otro perro con ese hueso", category: "Popular", difficulty: 1 },
  { text: "Más vale tarde que nunca", category: "Refrán", difficulty: 1 },
  { text: "No hay mal que por bien no venga", category: "Refrán", difficulty: 1 },
  { text: "Loro viejo no aprende a hablar", category: "Popular", difficulty: 1 },
  { text: "A papaya puesta papaya partida", category: "Colombiana", difficulty: 1 },

  // Nivel Medio (6-10)
  { text: "Del dicho al hecho hay mucho trecho", category: "Refrán", difficulty: 2 },
  { text: "Hijo de tigre sale pintado", category: "Popular", difficulty: 2 },
  { text: "El que mucho abarca poco aprieta", category: "Refrán", difficulty: 2 },
  { text: "Más sabe el diablo por viejo que por diablo", category: "Popular", difficulty: 2 },
  { text: "A caballo regalado no se le mira el diente", category: "Refrán", difficulty: 2 },

  // Nivel Difícil (11+)
  { text: "El que no tiene de inga tiene de mandinga", category: "Colombiana", difficulty: 3 },
  { text: "Camarón que se duerme se lo lleva la corriente", category: "Popular", difficulty: 3 },
  { text: "El que nace para maceta no pasa del corredor", category: "Colombiana", difficulty: 3 },
  { text: "Más vale pájaro en mano que cien volando", category: "Refrán", difficulty: 3 },
  { text: "No por mucho madrugar amanece más temprano", category: "Refrán", difficulty: 3 },
];

export default function FrasesRapidas() {
  const [currentPhrase, setCurrentPhrase] = useState<Frase>(frasesColombianasPool[0]);
  const [userInput, setUserInput] = useState("");
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState<"idle" | "playing" | "gameOver">("idle");
  const [message, setMessage] = useState("");
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer
  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStatus === "playing") {
      handleTimeout();
    }
  }, [timeLeft, gameStatus]);

  // Cargar high score
  useEffect(() => {
    const saved = localStorage.getItem("frasesHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const startGame = () => {
    setCurrentPhrase(frasesColombianasPool[0]);
    setUserInput("");
    setLives(3);
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameStatus("playing");
    setMessage("");
    setCombo(0);
    inputRef.current?.focus();
  };

  const handleTimeout = () => {
    setLives(lives - 1);
    if (lives <= 1) {
      endGame();
    } else {
      setMessage(`⏱️ ¡Se acabó el tiempo! Te quedan ${lives - 1} vidas`);
      setUserInput("");
      setTimeLeft(Math.max(30 - level * 2, 15));
    }
  };

  const endGame = () => {
    setGameStatus("gameOver");
    setMessage(`🎮 Game Over! Puntuación final: ${score}`);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("frasesHighScore", score.toString());
      setMessage(`🏆 ¡Nuevo récord! Puntuación: ${score}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    // Verificar si completó la frase
    if (input === currentPhrase.text) {
      handleCorrect();
    } else if (!currentPhrase.text.startsWith(input)) {
      handleMistake();
    }
  };

  const handleCorrect = () => {
    const points = (100 * currentPhrase.difficulty) + (combo * 50);
    setScore(score + points);
    setCombo(combo + 1);
    setMessage(`✅ ¡Excelente! +${points} puntos | Combo x${combo + 1}`);

    // Siguiente frase
    const nextLevel = Math.floor(score / 500) + 1;
    setLevel(nextLevel);

    const availablePhrases = frasesColombianasPool.filter(
      f => f.difficulty <= Math.min(Math.ceil(nextLevel / 5), 3)
    );
    const nextPhrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
    setCurrentPhrase(nextPhrase);
    setUserInput("");
    setTimeLeft(Math.max(30 - nextLevel * 2, 15));
  };

  const handleMistake = () => {
    setLives(lives - 1);
    setCombo(0);
    if (lives <= 1) {
      endGame();
    } else {
      setMessage(`❌ ¡Error! Te quedan ${lives - 1} vidas. Vuelve a intentar`);
      setUserInput("");
    }
  };

  // Función para renderizar el texto
  const renderPhrase = () => {
    return currentPhrase.text.split('').map((char, idx) => {
      const userChar = userInput[idx];
      let className = styles.letter;

      if (userChar) {
        className = userChar === char ? styles.letterCorrect : styles.letterWrong;
      }

      return (
        <span key={idx} className={className}>
          {char === ' ' ? '\u00A0\u00A0\u00A0' : char}  {/* Triple espacio para espacios */}
        </span>
      );
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>⌨️ Frases Colombianas Speed</h1>

      {gameStatus === "idle" && (
        <div className={styles.menu}>
          <h2>¿Qué tan rápido puedes escribir?</h2>
          <p>Escribe frases colombianas antes de que se acabe el tiempo</p>
          <button onClick={startGame} className={styles.startButton}>
            Comenzar Juego
          </button>
          {highScore > 0 && <p className={styles.highScore}>🏆 Récord: {highScore}</p>}
        </div>
      )}

      {gameStatus === "playing" && (
        <>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.hearts}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i}>{i < lives ? "❤️" : "🖤"}</span>
                ))}
              </span>
            </div>
            <div className={styles.stat}>⏱️ {timeLeft}s</div>
            <div className={styles.stat}>📊 {score} pts</div>
            <div className={styles.stat}>Nivel {level}</div>
            {combo > 0 && <div className={styles.combo}>🔥 Combo x{combo}</div>}
          </div>

          <div className={styles.gameArea}>
            <p className={styles.category}>Categoría: {currentPhrase.category}</p>

            {/* FRASE OBJETIVO CON RESALTADO MIENTRAS ESCRIBES */}
            <h2 className={styles.targetPhrase}>
              {currentPhrase.text.split('').map((char, idx) => {
                const userChar = userInput[idx];
                let style: React.CSSProperties = {
                  backgroundColor: char === ' ' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  padding: char === ' ' ? '0 8px' : '0',
                  borderRadius: '3px',
                  transition: 'all 0.2s ease'
                };

                // Resaltar según el progreso de escritura
                if (idx < userInput.length) {
                  if (userChar === char) {
                    style.color = '#10b981'; // Verde si es correcto
                    style.fontWeight = 'bold';
                  } else {
                    style.color = '#ef4444'; // Rojo si es incorrecto
                    style.textDecoration = 'underline';
                  }
                } else if (idx === userInput.length) {
                  // Letra actual a escribir
                  style.borderBottom = '2px solid #fbbf24';
                }

                return (
                  <span key={idx} style={style}>
                    {char === ' ' ? '\u00A0\u00A0' : char}
                  </span>
                );
              })}
            </h2>

            <div className={styles.typingArea}>{renderPhrase()}</div>

            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Empieza a escribir..."
              autoFocus
            />

            {message && <p className={styles.message}>{message}</p>}
          </div>
        </>
      )}

      {gameStatus === "gameOver" && (
        <div className={styles.gameOver}>
          <h2>🎮 Fin del Juego</h2>
          <p className={styles.finalScore}>Puntuación Final: {score}</p>
          <p className={styles.finalLevel}>Nivel Alcanzado: {level}</p>
          {score === highScore && <p className={styles.newRecord}>🏆 ¡NUEVO RÉCORD!</p>}
          <button onClick={startGame} className={styles.startButton}>
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  );
}
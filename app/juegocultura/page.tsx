"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Question = {
  question: string;
  options: string[];
  correct: string;
};

const questionsPool: Question[] = [
  { question: "¿Cuál es la capital de Colombia?", options: ["A. Medellín", "B. Bogotá", "C. Cali", "D. Barranquilla"], correct: "B" },
  { question: "¿Qué río es el más largo de Colombia?", options: ["A. Magdalena", "B. Cauca", "C. Amazonas", "D. Atrato"], correct: "A" },
  { question: "¿Cuál es el baile típico de la región Caribe?", options: ["A. Salsa", "B. Vallenato", "C. Cumbia", "D. Merengue"], correct: "C" },
  { question: "¿Qué fruta es típica en el Valle del Cauca?", options: ["A. Mango", "B. Lulo", "C. Papaya", "D. Maracuyá"], correct: "B" },
  { question: "¿Cuál es la montaña más alta de Colombia?", options: ["A. Nevado del Ruiz", "B. Pico Cristóbal Colón", "C. Sierra Nevada del Cocuy", "D. Cerro Kennedy"], correct: "B" },
  { question: "¿Qué ciudad es conocida como la 'Ciudad de la Eterna Primavera'?", options: ["A. Medellín", "B. Bogotá", "C. Cali", "D. Cartagena"], correct: "A" },
  { question: "¿Qué evento se celebra en Barranquilla con desfiles y disfraces?", options: ["A. Feria de Cali", "B. Carnaval", "C. Festival Vallenato", "D. Feria de las Flores"], correct: "B" },
  { question: "¿Cuál es el plato típico de la región Andina?", options: ["A. Bandeja Paisa", "B. Arepa de huevo", "C. Sancocho de pescado", "D. Cazuela de mariscos"], correct: "A" },
  { question: "¿Cuál es el símbolo nacional de Colombia?", options: ["A. Cóndor", "B. Jaguar", "C. Loro", "D. Mariposa"], correct: "A" },
  { question: "¿Qué ciudad es famosa por sus murales y grafitis?", options: ["A. Bogotá", "B. Medellín", "C. Cali", "D. Barranquilla"], correct: "A" },
  { question: "¿Cuál es el río que atraviesa Bogotá?", options: ["A. Bogotá", "B. Magdalena", "C. Cauca", "D. Atrato"], correct: "A" },
  { question: "¿Qué café es famoso en Colombia?", options: ["A. Café de Antioquia", "B. Café de Colombia", "C. Café del Valle", "D. Café del Caribe"], correct: "B" },
  { question: "¿Qué región produce más banano?", options: ["A. Caribe", "B. Andina", "C. Pacífica", "D. Amazonía"], correct: "A" },
  { question: "¿Qué ciudad es conocida por su salsa?", options: ["A. Cali", "B. Medellín", "C. Barranquilla", "D. Cartagena"], correct: "A" },
  { question: "¿Qué mar baña la costa norte de Colombia?", options: ["A. Pacífico", "B. Caribe", "C. Atlántico", "D. Mediterráneo"], correct: "B" },
  { question: "¿Cuál es el deporte más popular en Colombia?", options: ["A. Fútbol", "B. Baloncesto", "C. Voleibol", "D. Ciclismo"], correct: "A" },
  { question: "¿Cuál es el plato típico de la costa Caribe?", options: ["A. Arroz con coco", "B. Bandeja paisa", "C. Ajiaco", "D. Tamal"], correct: "A" },
  { question: "¿Qué ciudad es famosa por el Festival Vallenato?", options: ["A. Valledupar", "B. Medellín", "C. Bogotá", "D. Cali"], correct: "A" },
  { question: "¿Qué desierto se encuentra en La Guajira?", options: ["A. Tatacoa", "B. La Guajira", "C. Sonora", "D. Atacama"], correct: "B" },
  { question: "¿Qué isla es famosa por su ciudad amurallada?", options: ["A. San Andrés", "B. Providencia", "C. Cartagena", "D. Santa Marta"], correct: "C" },
  { question: "¿Cuál es el ave nacional de Colombia?", options: ["A. Cóndor", "B. Águila", "C. Loro", "D. Colibrí"], correct: "A" },
  { question: "¿Qué ciudad es conocida como la Puerta de Oro de Colombia?", options: ["A. Barranquilla", "B. Cartagena", "C. Santa Marta", "D. Montería"], correct: "A" },
  { question: "¿Qué ciudad es famosa por el Museo del Oro?", options: ["A. Bogotá", "B. Medellín", "C. Cali", "D. Popayán"], correct: "A" },
  { question: "¿Qué género musical se originó en la región Caribe?", options: ["A. Cumbia", "B. Salsa", "C. Vallenato", "D. Porro"], correct: "A" },
  { question: "¿Cuál es la capital del departamento de Antioquia?", options: ["A. Medellín", "B. Bogotá", "C. Cali", "D. Bucaramanga"], correct: "A" },
  { question: "¿Qué ciudad es famosa por la Feria de las Flores?", options: ["A. Medellín", "B. Bogotá", "C. Cali", "D. Barranquilla"], correct: "A" },
  { question: "¿Qué región de Colombia tiene selva amazónica?", options: ["A. Amazonía", "B. Andina", "C. Caribe", "D. Pacífica"], correct: "A" },
  { question: "¿Qué río baña Cali?", options: ["A. Cauca", "B. Magdalena", "C. Bogotá", "D. Atrato"], correct: "A" },
  { question: "¿Cuál es el plato típico de Boyacá?", options: ["A. Sancocho", "B. Arepa Boyacense", "C. Bandeja Paisa", "D. Ceviche"], correct: "B" },
  { question: "¿Qué ciudad es conocida como la Atenas de Colombia?", options: ["A. Popayán", "B. Bogotá", "C. Medellín", "D. Cali"], correct: "A" },
  { question: "¿Qué mar baña la costa pacífica de Colombia?", options: ["A. Pacífico", "B. Caribe", "C. Atlántico", "D. Mediterráneo"], correct: "A" },
  { question: "¿Qué ciudad es famosa por su puente festivo de Carnaval?", options: ["A. Barranquilla", "B. Cartagena", "C. Medellín", "D. Cali"], correct: "A" },
  { question: "¿Cuál es la principal exportación de Colombia?", options: ["A. Café", "B. Oro", "C. Petróleo", "D. Esmeraldas"], correct: "A" },
  { question: "¿Qué ciudad es sede del Festival de Cine de Cartagena?", options: ["A. Cartagena", "B. Medellín", "C. Bogotá", "D. Cali"], correct: "A" },
  { question: "¿Qué región es famosa por el café?", options: ["A. Eje cafetero", "B. Caribe", "C. Pacífica", "D. Llanos"], correct: "A" },
  { question: "¿Qué ciudad es conocida como la Capital Musical de Colombia?", options: ["A. Barranquilla", "B. Bogotá", "C. Cali", "D. Medellín"], correct: "C" },
  { question: "¿Qué fruta típica se cultiva en el eje cafetero?", options: ["A. Café", "B. Banano", "C. Mango", "D. Lulo"], correct: "A" },
  { question: "¿Qué ciudad es famosa por su Catedral de Sal?", options: ["A. Zipaquirá", "B. Bogotá", "C. Medellín", "D. Cali"], correct: "A" },
  { question: "¿Qué ciudad es conocida como la Capital de la Montaña?", options: ["A. Manizales", "B. Bogotá", "C. Medellín", "D. Cali"], correct: "A" },
  { question: "¿Qué ciudad es famosa por la Universidad del Valle?", options: ["A. Cali", "B. Bogotá", "C. Medellín", "D. Barranquilla"], correct: "A" },
  { question: "¿Cuál es la capital de Santander?", options: ["A. Bucaramanga", "B. Bogotá", "C. Medellín", "D. Cali"], correct: "A" },
  { question: "¿Qué ciudad es conocida por sus casas coloniales?", options: ["A. Cartagena", "B. Bogotá", "C. Medellín", "D. Cali"], correct: "A" },
  { question: "¿Cuál es el plato típico de la región Caribe?", options: ["A. Arepa de huevo", "B. Bandeja Paisa", "C. Sancocho de gallina", "D. Arroz atollado"], correct: "A" },
  { question: "¿Qué ciudad tiene el Cerro Monserrate?", options: ["A. Bogotá", "B. Medellín", "C. Cali", "D. Cartagena"], correct: "A" },
  { question: "¿Qué ciudad es famosa por sus ferias y festivales culturales?", options: ["A. Medellín", "B. Bogotá", "C. Cali", "D. Barranquilla"], correct: "A" },
  { question: "¿Cuál es la región de Llanos Orientales famosa por ganadería?", options: ["A. Llanos", "B. Caribe", "C. Andina", "D. Pacífica"], correct: "A" },
  { question: "¿Qué ciudad es conocida como la Sultana del Valle?", options: ["A. Cali", "B. Medellín", "C. Bogotá", "D. Barranquilla"], correct: "A" },
  { question: "¿Qué región produce más flores para exportación?", options: ["A. Cundinamarca", "B. Antioquia", "C. Valle del Cauca", "D. Boyacá"], correct: "A" },
  { question: "¿Cuál es el parque natural más famoso de Colombia?", options: ["A. Tayrona", "B. Chingaza", "C. Los Nevados", "D. Amacayacu"], correct: "A" },
  { question: "¿Qué ciudad es conocida por su arquitectura colonial y su universidad?", options: ["A. Popayán", "B. Bogotá", "C. Medellín", "D. Cali"], correct: "A" }
];

export default function SubeYAprende() {
  const [position, setPosition] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState<Question | null>(null);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const nextQuestion = () => {
    if (usedQuestions.length === questionsPool.length) {
      // Reinicia las preguntas si se acaban
      setUsedQuestions([]);
    }
    let idx: number;
    do {
      idx = Math.floor(Math.random() * questionsPool.length);
    } while (usedQuestions.includes(idx));
    setUsedQuestions([...usedQuestions, idx]);
    setCurrentQ(questionsPool[idx]);
    setMessage("");
    setDiceRoll(null);
  };

  const handleAnswer = (option: string) => {
    if (!currentQ) return;
    if (option === currentQ.correct) {
      if (diceRoll === null) {
        setMessage("Tira el dado antes de avanzar.");
        return;
      }
      const newPos = Math.min(position + diceRoll, 50);
      setPosition(newPos);
      setMessage(`¡Correcto! Avanzas ${diceRoll} casilla(s).`);
    } else {
      const back = Math.floor(Math.random() * 4) + 1;
      const newPos = Math.max(position - back, 0);
      setPosition(newPos);
      setMessage(`¡Incorrecto! Retrocedes ${back} casilla(s).`);
    }
    nextQuestion();
  };

  const handleDice = () => {
    const dice = rollDice();
    setDiceRoll(dice);
    setMessage(`Tiraste el dado: ${dice}. Ahora responde la pregunta.`);
  };

  // Inicia la primera pregunta
  if (!currentQ) nextQuestion();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎲 Sube y Aprende</h1>

      <div className={styles.board}>
        {Array.from({ length: 51 }, (_, i) => (
          <div key={i} className={`${styles.cell} ${i === position ? styles.active : ""}`}>
            {i}
          </div>
        ))}
      </div>

      <div className={styles.question}>
        <h2>{currentQ?.question}</h2>
        <button onClick={handleDice} className={styles.diceButton}>
          Tirar Dado 🎲
        </button>
        {diceRoll !== null && (
          <div className={styles.options}>
            {currentQ?.options.map((opt) => (
              <button key={opt} onClick={() => handleAnswer(opt[0])} className={styles.optionButton}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {message && <p className={styles.message}>{message}</p>}

      {position === 50 && <h2 className={styles.win}>🎉 ¡Felicidades! Llegaste a la meta.</h2>}
    </div>
  );
}

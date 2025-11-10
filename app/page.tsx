"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  // 🧠 Definimos los juegos
  const games = [
    {
      name: "NeuroDots",
      image: "/7283055.png",
      href: "/juegopuntos",
      description: "Pon a prueba tu memoria visual con secuencias de puntos.",
    },
    {
      name: "Sube y Aprende",
      image: "/3002743.png",
      href: "/juegocultura",
      description: "Prueba que tanto sabes de colombia",
    },
    {
      name: "ShapeFocus",
      image: "/shapefocus.png",
      href: "/formas",
      description: "Encuentra la figura que cambia entre una secuencia rápida.",
    },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🎮 Bienvenido a juegos Grass-Rubio</h1>
      <p className={styles.subtitle}>
        Un espacio para la diversión
      </p>

      <div className={styles.grid}>
        {games.map((game) => (
          <Link href={game.href} key={game.name} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={game.image}
                alt={game.name}
                width={80}   // tamaño fijo
                height={80}  // tamaño fijo
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>{game.name}</h2>
              <p>{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

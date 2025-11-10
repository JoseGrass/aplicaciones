"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./navbar.module.css";

type LinkItem = {
  href: string;
  label: string;
};

export default function NavBar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

const links: LinkItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/juegopuntos", label: "NeuroDots" },
  { href: "/juegocultura", label: "Sube y Aprende" },
  { href: "/formas", label: "Frases Rápidas" },
];

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>🎮 Juegos</div>

        {/* Botón de menú para móvil */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
        </button>

        {/* Links */}
        <nav
          className={`${styles.navLinks} ${
            menuOpen ? styles.navOpen : ""
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${
                path === link.href ? styles.active : ""
              }`}
              onClick={() => setMenuOpen(false)} // cerrar menú al hacer clic
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

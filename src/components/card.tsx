"use client";

import React, { useState, useRef } from "react";
import styles from "./card.module.css";

export type FoilType =
  | "none"
  | "holofoil"
  | "reverse-holofoil"
  | "full-art"
  | "shining"
  | "cosmos"
  | "ace-spec";

interface PokemonCardProps {
  imageUrl: string;
  foilType?: FoilType;
  className?: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  imageUrl,
  foilType = "none",
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variables for the mask position
    cardRef.current.style.setProperty(
      "--mouse-x",
      `${(x / rect.width) * 100}%`
    );
    cardRef.current.style.setProperty(
      "--mouse-y",
      `${(y / rect.height) * 100}%`
    );

    setMousePosition({
      x: (x / rect.width - 0.5) * 2, // -1 to 1
      y: (y / rect.height - 0.5) * 2, // -1 to 1
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    if (cardRef.current) {
      cardRef.current.style.removeProperty("--mouse-x");
      cardRef.current.style.removeProperty("--mouse-y");
    }
  };

  const cardTransform = isHovered
    ? `perspective(1000px) rotateX(${mousePosition.y * -8}deg) rotateY(${
        mousePosition.x * 8
      }deg)`
    : "perspective(1000px) rotateX(0) rotateY(0)";

  const holofoilTransform = isHovered
    ? `translateZ(1px) rotateX(${mousePosition.y * -32}deg) rotateY(${
        mousePosition.x * 32
      }deg)`
    : "translateZ(1px) rotateX(0) rotateY(0)";

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[foilType]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform: cardTransform }}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardContent}>
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt="Pokemon card"
              className={styles.pokemonImage}
            />
            {foilType === "cosmos" && <div className={styles.cosmosImage} />}
          </div>
        </div>
        {foilType !== "none" && (
          <div
            className={styles.foilOverlay}
            style={{
              transform: foilType === "ace-spec" ? "none" : holofoilTransform,
            }}
          />
        )}
      </div>
    </div>
  );
};

import React from "react";
import "./styles/titleanimation.css";

export default function Title({ text }) {
  const letters = text.split("");

  return (
    <div className="animated-text">
      {letters.map((character, index) => (
        <span
          key={index}
          className={character === " " ? "space" : `color-${index + 1}`}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </div>
  );
}

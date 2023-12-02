import React from "react";
import "./styles/heart.css";
import filledHeart from "./images/heart_drawing_filled.png";
import emptyHeart from "./images/heart_drawing_empty.png";

export default function Heart({ remainingLife }) {
  const hearts = Array.from({ length: 5 }, (_, index) => (
    <img
      key={index}
      className="heart-icon"
      src={index < remainingLife ? filledHeart : emptyHeart}
      alt={index < remainingLife ? "filled heart" : "empty heart"}
      draggable={false}
    />
  ));

  return <>{hearts}</>;
}

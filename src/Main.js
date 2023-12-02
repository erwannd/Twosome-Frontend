import React from "react";
import "./main.css";
import heart from "./heart_empty-removebg-preview.png";

function Main() {
  return (
    <div className="main-app">
      <div className="menu">
        <button>Button1</button>
        <button>Button2</button>
        <button>Button3</button>
        <button>Button4</button>
      </div>
      <div className="game">
        <div className="game-screen"></div>
      </div>
      <div className="user">
        <div className="user-container">
          <div className="plus-icon">+</div>
          <img className="user-profile-picture" src={heart} alt="pic"></img>
        </div>
      </div>
    </div>
  );
}

export default Main;

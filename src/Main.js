import React, { useState } from "react";
import "./main.css";
import heart from "./heart_empty-removebg-preview.png";

function Main() {
  const [mode, setMode] = useState("mode1");

  // Toggle between different modes at the click of a button
  const handleMenuButtonClick = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className="main-app">
      <div className="menu">
        <button
          className={mode === "mode1" ? "active" : ""}
          onClick={() => handleMenuButtonClick("mode1")}
        >
          Button1
        </button>
        <button
          className={mode === "mode2" ? "active" : ""}
          onClick={() => handleMenuButtonClick("mode2")}
        >
          Button2
        </button>
        <button
          className={mode === "mode3" ? "active" : ""}
          onClick={() => handleMenuButtonClick("mode3")}
        >
          Button3
        </button>
        <button
          className={mode === "mode4" ? "active" : ""}
          onClick={() => handleMenuButtonClick("mode4")}
        >
          Button4
        </button>
      </div>
      <div className="game">
        <div className="game-screen"></div>
      </div>
      <div className="user">
        <div className="profile-container">
          <div className="outer">
            <img
              src={heart}
              alt="Profile"
              className="profile-image"
              draggable={false}
            />
            <div className="inner">
              <input className="inputfile" type="file"></input>
            </div>
          </div>
        </div>
        <p className="username">My Name Jeff</p>
      </div>
    </div>
  );
}

export default Main;

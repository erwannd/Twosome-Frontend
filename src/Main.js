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

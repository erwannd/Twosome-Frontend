import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import Game from "./Game";
import heart from "./heart_empty-removebg-preview.png";

function Main() {
  const [mode, setMode] = useState("game");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  // Toggle between different modes at the click of a button
  const handleMenuButtonClick = (selectedMode) => {
    setMode(selectedMode);
  };

  // Define available modes
  const modeComponents = {
    game: (
      <Game
        user={user}
        username={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    ),
    records: <div>Records</div>,
    mode3: <div>Mode3</div>,
    mode4: <div>Mode4</div>,
  };

  // This will be called by LoginForm
  function handleLogin(user) {
    setUser(user);
    if (user !== null) {
      axios
        .get(
          `https://wheelofortune.wl.r.appspot.com/findNameById?googleId=${user.uid}`
        )
        .then((response) => {
          if (response.data !== null) {
            setUserName((prev) => response.data[0].name);
            // Testing login event listener
            // console.log(response.data[0].name);
            // console.log(user.uid);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Called by LoginForm
  function handleLogout() {
    setUserName(null);
  }

  return (
    <div className="main-app">
      <div className="menu">
        <button
          className={mode === "game" ? "active" : ""}
          onClick={() => handleMenuButtonClick("game")}
        >
          Game
        </button>
        <button
          className={mode === "records" ? "active" : ""}
          onClick={() => handleMenuButtonClick("records")}
        >
          Records
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
      <div className="middle">
        <div className="mid-screen">{modeComponents[mode]}</div>
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
        <p className="username">My Name {userName}</p>
      </div>
    </div>
  );
}

export default Main;

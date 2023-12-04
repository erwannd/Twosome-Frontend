import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import Game from "./Game";
import RecordViewer from "./RecordViewer";
import ProfileUpdater from "./UpdateProfile";
import prof_pic from "./profile_pictures/dog.jpg";

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
    records: (
      <RecordViewer
        userId={user ? user.uid : null}
        username={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    ),
    updateProfile: (
      <ProfileUpdater
        user={user}
        username={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    ),
    mode4: <div>Mode4</div>,
  };

  // This will be called by LoginForm
  // Sets the username to then display it on the UI
  // or pass it as prop to children
  function handleLogin(user) {
    setUser(user);
    if (user !== null) {
      axios
        .get(
          `https://twosome-backend.wl.r.appspot.com/findUserNameById?googleId=${user.uid}`
        )
        .then((response) => {
          // Check if the response is an empty array (player does not have a user record
          // associated with their account).
          if (response.data !== null && response.data.length > 0) {
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
          className={mode === "updateProfile" ? "active" : ""}
          onClick={() => handleMenuButtonClick("updateProfile")}
        >
          Profile
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
              src={prof_pic}
              alt="Profile"
              className="profile-image"
              draggable={false}
            />
            <div className="inner">
              <input className="inputfile" type="file"></input>
            </div>
          </div>
        </div>
        <p className="username">{userName}</p>
      </div>
    </div>
  );
}

export default Main;

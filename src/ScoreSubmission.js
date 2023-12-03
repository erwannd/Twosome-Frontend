import React, { useState } from "react";
import axios from "axios";
import "./styles/scoresubmission.css";
import noBtn from "./images/no-btn.png";
import noBtnFocus from "./images/no-btn-focus.png";
import yesBtn from "./images/yes-btn.png";
import yesBtnFocus from "./images/yes-btn-focus.png";

export default function ScoreSubmission({ user, username, score, onExit }) {
  const [playerName, setPlayerName] = useState(username);

  async function handleSubmission(event) {
    event.preventDefault();

    const data = {
      record: {
        googleId: user.uid,
        score: score,
      },
      name: playerName,
    };

    try {
      const response = await axios.post(
        "https://twosome-backend.wl.r.appspot.com/saveGame",
        data
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    onExit();
  }

  function cancelSubmit(event) {
    event.preventDefault();
    onExit();
  }

  return (
    <div className="record-submission">
      <p>Add your score to the leaderboard?</p>
      <div className="submission-confirmation">
        <img
          src={yesBtn}
          onClick={handleSubmission}
          className="confirm-btn"
          onMouseOver={(e) => (e.target.src = yesBtnFocus)}
          onMouseOut={(e) => (e.target.src = yesBtn)}
        ></img>
        <img
          src={noBtn}
          onClick={cancelSubmit}
          className="confirm-btn"
          onMouseOver={(e) => (e.target.src = noBtnFocus)}
          onMouseOut={(e) => (e.target.src = noBtn)}
        ></img>
      </div>

      <form className="submit-score-form">
        <label className="input-label">Enter your name</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

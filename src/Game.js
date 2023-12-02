import React, { useEffect, useState } from "react";
import startBtn from "./images/start-btn.png";
import phraseList from "./files/phrases.json";
import GetPlayerGuess from "./GetPlayerGuess";
import "./styles/game.css";
import Fireworks from "./Fireworks";

// Sets a hidden letter into this character
const HIDDEN = "_";
// Maximum number of misses
const STARTING_HEALTH = 5;

export default function Game() {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);
  const [randomPhrase, setRandomPhrase] = useState("");
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameComplete, setGameCompletion] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [health, setHealth] = useState(STARTING_HEALTH);

  useEffect(() => {
    if (gameInProgress) {
      setDisplayedPhrase(hideRandomPhrase(randomPhrase));
    }
  }, [randomPhrase, gameInProgress]);

  // This is run when the player clicks the start button
  const handleStart = () => {
    setGameCompletion(false);
    setPreviousGuesses([]);
    setScore(0);
    setHealth(STARTING_HEALTH);

    // Simulate asynchronous setup logic
    Promise.resolve().then(() => {
      // Finally, set gameStart to true
      setGameStart(true);
      setGameInProgress(true);
    });
    const rdn = getRandomPhrase();
    setRandomPhrase(rdn);
    setMessage("");
    setFeedback("");
  };

  const handleExitSubmission = () => {
    setGameStart(false);
    setGameCompletion(false);
    setGameInProgress(false);
    setMessage("");
  };

  // Function to handle guess submission
  const handleGuess = (guess) => {
    if (randomPhrase.toLowerCase().includes(guess.toLowerCase())) {
      // Player guess is correct
      setScore(score + 1);
      const updatedPhrase = updateDisplayedPhrase(
        randomPhrase,
        displayedPhrase,
        guess
      );

      // If there's no more asterisk, the user has successfully guessed the phrase
      if (!updatedPhrase.includes(HIDDEN)) {
        setGameCompletion(true);
        setMessage(`You guessed the secret phrase!`);
        setScore(score + health * 5);
      }
      setDisplayedPhrase(updatedPhrase);
    } else {
      // Player guess incorrectly
      setFeedback("Your guess is not in the phrase");
      setHealth((prevHealth) => prevHealth - 1);

      // If health is zero after state update, the game is over
      if (health - 1 === 0) {
        setGameCompletion(true);
        setMessage(`GAME OVER. The phrase is: ${randomPhrase}`);
      }
    }

    setPreviousGuesses([...previousGuesses, guess.toLowerCase()]);
  };

  return (
    <>
      {!gameStart && (
        <div className="game-opening">
          <h1>{/* <Title text="Wheel of Fortune" /> */}</h1>
          <button onClick={handleStart} className="start-btn">
            <span>START</span>
          </button>
        </div>
      )}

      {/* On game start display player info and health */}
      {gameStart && (
        <>
          <p className="hidden-phrase">{displayedPhrase}</p>
          {/* <div className="hearts-container">
            <Heart remainingLife={health} />
          </div> */}
          <p className="score">Score: {score}</p>

          {/* Game is not complete, keep playing */}
          {!gameComplete && randomPhrase && (
            <>
              <GetPlayerGuess
                onGuess={handleGuess}
                previousGuesses={previousGuesses}
                clearFeedback={() => setFeedback("")}
              />
              <p className="answer-feedback">{feedback}</p>
            </>
          )}
        </>
      )}

      {/* Checks for game completion */}
      {gameComplete && (
        <>
          <p className="result-message">{message}</p>
          {health > 0 && <Fireworks />}
        </>
      )}
    </>
  );
}

function getRandomPhrase() {
  const randomNumber = Math.random(); // Generate a random decimal between 0 and 1
  const scaledNumber = Math.floor(randomNumber * phraseList.length);
  return phraseList[scaledNumber];
}

function hideRandomPhrase(phrase) {
  return phrase.replace(/[a-zA-Z]/g, HIDDEN); // Replaces phrase with *'s.
}

function updateDisplayedPhrase(phrase, displayedPhrase, guess) {
  const phraseArr = displayedPhrase.split("");
  for (let index = 0; index < phrase.length; index++) {
    if (phrase.toLowerCase()[index] === guess.toLowerCase()) {
      phraseArr[index] = phrase[index];
    }
  }
  const updatedHiddenPhrase = phraseArr.join("");
  return updatedHiddenPhrase;
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import GetPlayerGuess from "./GetPlayerGuess";
import "./styles/game.css";
import LoginForm from "./LoginForm";
import ScoreSubmission from "./ScoreSubmission";
import Heart from "./Heart";
import Fireworks from "./Fireworks";
import Title from "./TitleAnimation";

// Sets a hidden letter into this character
const HIDDEN = "*";
// Maximum number of misses
const STARTING_HEALTH = 5;

export default function Game({ user, username, onLogin, onLogout }) {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);

  // Const to store available phrase categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomPhrase, setRandomPhrase] = useState("");
  const [hint, setHint] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);

  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameComplete, setGameCompletion] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [health, setHealth] = useState(STARTING_HEALTH);

  // Get an array of all available categories when this component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://twosome-backend.wl.r.appspot.com/findAllPhrases"
        );
        const phrases = response.data;
        const uniqueCategories = [
          ...new Set(phrases.map((phrase) => phrase.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching phrases:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to handle category drop-down change
  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
  };

  // Create a displayed phrase (of asterisks) from the random phrase
  useEffect(() => {
    if (gameInProgress) {
      setDisplayedPhrase(hideRandomPhrase(randomPhrase));
    }
  }, [randomPhrase, gameInProgress]);

  // This is run when the player clicks the start button
  const handleStart = async () => {
    setGameCompletion(false);
    setPreviousGuesses([]);
    setScore(0);
    setHealth(STARTING_HEALTH);

    try {
      console.log(`selected: ${selectedCategory}`);
      const response = await axios.get(
        `https://twosome-backend.wl.r.appspot.com/getRandomPhraseByCategory?category=${selectedCategory}`
      );
      const phrase = response.data;
      setRandomPhrase(phrase.phrase);
      setHint(phrase.hint);
      setGameStart(true);
      setGameInProgress(true);
      setMessage("");
      setFeedback("");
    } catch (error) {
      console.error("Error fetching random phrase:", error);
    }

    // // Simulate asynchronous setup logic
    // Promise.resolve().then(() => {
    //   // Finally, set gameStart to true
    //   setGameStart(true);
    //   setGameInProgress(true);
    // });
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
      setScore(score + 5);
      const updatedPhrase = updateDisplayedPhrase(
        randomPhrase,
        displayedPhrase,
        guess
      );

      // If there's no more asterisk, the user has successfully guessed the phrase
      if (!updatedPhrase.includes(HIDDEN)) {
        setGameCompletion(true);
        setMessage(`You guessed the secret phrase!`);
        setScore(score + health * 20);
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
        <>
          <Title text="Wheel Of Fortune" />
          <div className="login-area">
            {user && username ? (
              <p>Welcome back, {username}</p>
            ) : (
              user && !username && <p>Hello, newcomer</p>
            )}

            {!user && (
              <>
                <p>You are not logged in.</p>
                <p>Please login to play</p>
              </>
            )}
            <LoginForm
              username={username}
              loginEvent={onLogin}
              logoutEvent={onLogout}
            />
          </div>

          {user && (
            <>
              <div className="category-dropdown">
                <label>Select a category to play</label>
                <select
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleStart} className="start-btn">
                <span>START</span>
              </button>
            </>
          )}
        </>
      )}

      {/* On game start display player info and health */}
      {gameStart && selectedCategory && (
        <>
          <p className="hidden-phrase">
            {displayedPhrase}{" "}
            {!gameComplete && hint && (
              <span
                onMouseOver={() => setHintVisible(true)}
                onMouseOut={() => setHintVisible(false)}
              >
                ℹ️
              </span>
            )}
            {hint && hintVisible && <p>Hint: {hint}</p>}
          </p>
          <div className="hearts-container">
            <Heart remainingLife={health} />
          </div>
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
          <ScoreSubmission
            user={user}
            username={username}
            score={score}
            onExit={handleExitSubmission}
          />
          {health > 0 && <Fireworks />}
        </>
      )}
    </>
  );
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

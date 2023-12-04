import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import "./styles/addphrase.css";

export default function AddYourPhrase({ user, username, onLogin, onLogout }) {
  const [phrase, setPhrase] = useState("");
  const [hint, setHint] = useState("");
  const [category, setCategory] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      phrase: phrase,
      category: category,
      hint: hint,
    };

    try {
      const response = await axios.post(
        "https://twosome-backend.wl.r.appspot.com/addPhrase",
        postData
      );
      setPhrase("");
      setHint("");
      setCategory("");
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sets a timeout to clear success message after 3 secs
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);

    // Clear the timeout when the component is unmounted or when the form is interacted with
    return () => clearTimeout(timeoutId);
  }, [submitSuccess]);

  return (
    <>
      {user ? (
        <>
          {loading && <p>Loading...</p>}
          {submitSuccess && (
            <div className="success-alert">Submission successful!</div>
          )}
          <form className="user-phrase-submission" onSubmit={handleSubmit}>
            <label>
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <br />
            <label>
              Phrase:
              <input
                type="text"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
              />
            </label>
            <br />
            <label>
              Hint:
              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
              />
            </label>
            <br />
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit your phrase"}
            </button>
          </form>
        </>
      ) : (
        <div className="login-reminder">
          <p>Login to submit your own phrase</p>
          <LoginForm
            username={username}
            loginEvent={onLogin}
            logoutEvent={onLogout}
          />
        </div>
      )}
    </>
  );
}

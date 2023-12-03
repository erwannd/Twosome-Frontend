import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import "./styles/loginform.css";
import doorOpen from "./images/door-open.png";
import doorClosed from "./images/door-closed.png";
import google from "./images/google.png";

function LoginForm({ username, loginEvent, logoutEvent }) {
  const [loggedUser, setLoggedUser] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyD7iTnTPpVqjtDCCNMGN596-6BUQMVh0Vc",
    authDomain: "wof-login-13ff6.firebaseapp.com",
    projectId: "wof-login-13ff6",
    storageBucket: "wof-login-13ff6.appspot.com",
    messagingSenderId: "579155277035",
    appId: "1:579155277035:web:2faede914f2da4fbea3aae",
    measurementId: "G-VXPHSCV5HE",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then((result) => {
        // User signed in
        console.log(result.user);
        setLoggedUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };

  // Sign out
  function logoutGoogle() {
    const auth = getAuth();
    auth.signOut();
    setLoggedUser(null);
    logoutEvent();
  }

  // We put the onAuthStateChanged in useEffect so this is only called when
  // this component mounts
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in");
        setLoggedUser(user);
        console.log(user.uid);
        console.log(username);
      } else {
        console.log("No user is signed in.");
      }
      loginEvent(user);
    });
  }, []);

  return loggedUser ? (
    <img
      src={doorClosed}
      className="logout-btn"
      onClick={logoutGoogle}
      onMouseOver={(e) => (e.target.src = doorOpen)}
      onMouseOut={(e) => (e.target.src = doorClosed)}
      draggable={false}
    ></img>
  ) : (
    <div>
      <div className="login-btn-container">
        <img
          src={google}
          className="login-btn"
          onClick={signInWithGoogle}
          draggable={false}
        ></img>
      </div>
    </div>
  );
}

export default LoginForm;

//dependencies imports
import React, { useState, useEffect } from "react";

//module imports
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../signup/registration_form";
import "./styles.css";

//landing/welcome page component
const LandingPage = () => {
  return (
    <div className="loginout-layout">
      <WELCOMECOMPONENT />
    </div>
  );
};

//conatainer to hold welcome component
const WELCOMECOMPONENT = () => {
  const refreshPageToRemoveNavBar = () => {
    return null;
  };

  useEffect(() => {
    refreshPageToRemoveNavBar();
  }, []);

  const [choice, setChoice] = useState("");

  //functions to display selected coponent on screen
  const logInHandler = () => setChoice("LOGIN");
  const logRegisterHandler = () => setChoice("REGISTER");
  const welcome = (
    <>
      <div className="containerL">
        <div className="banner">
          <h1>
            WELCOME TO <span>AZUBI</span>
          </h1>
          <p>EVENT BOOKING PLATFORM</p>
          <button className="btn-left" type="button" onClick={logInHandler}>
            Login
          </button>
          <button
            type="button"
            className="btn-right"
            onClick={logRegisterHandler}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
  const login = (
    <>
      <LOGIN />
    </>
  );
  const register = (
    <>
      <Register />
    </>
  );
  let next = "";

  //checks which choice was chosen and displays the respective component
  if (choice === "") {
    next = welcome;
  }
  if (choice === "LOGIN") {
    next = login;
  }
  if (choice === "REGISTER") {
    next = register;
  }

  return <>{next}</>;
};

const LOGIN = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

const Register = () => {
  return (
    <>
      <RegistrationForm />
    </>
  );
};

export default LandingPage;

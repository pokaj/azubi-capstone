import React, { useState } from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../signup/registration_form";
import "./styles.css";

const LandingPage = () => {
  return (
    <div className="loginout-layout">
      <WELCOMECOMPONENT />
    </div>
  );
};

const WELCOMECOMPONENT = () => {
  const [choice, setChoice] = useState("");

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

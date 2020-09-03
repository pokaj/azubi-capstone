import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./signup/registration_form";

const LOGINOUTLAYOUT = () => {
  return (
    <div className="loginout-layout">
      <WELCOMECOMPONENT />
    </div>
  );
};

const WELCOMECOMPONENT = () => {
  const [choice, setChoice] = useState("");

  // const logInHandler = ()=> <LOGIN />;
  // const logRegisterHandler = ()=> <Register />;
  const logInHandler = () => setChoice("LOGIN");
  const logRegisterHandler = () => setChoice("REGISTER");
  const welcome = (
    <>
      <div>
        <h1>WELCOME TO AZUBI EVENT BOOKING PLATFORM</h1>
      </div>
      <div className="loginout-wrapper">
        <button className="logInHandler" onClick={logInHandler}>
          Login
        </button>
        <button className="logRegisterHandler" onClick={logRegisterHandler}>
          Register
        </button>
      </div>
    </>
  );
  const login = (
    <div>
      {" "}
      <LOGIN />{" "}
    </div>
  );
  const register = (
    <div>
      {" "}
      <Register />{" "}
    </div>
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

  return (
    <div className="centerForm">
      <div className="welcome-component">{next}</div>
    </div>
  );
};

const LOGIN = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

const Register = () => {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
};

export default LOGINOUTLAYOUT;

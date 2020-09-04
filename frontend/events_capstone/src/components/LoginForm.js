import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RegistrationForm from "./signup/registration_form";
import ErrorMessage from "./signup/errorMessages";

const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [choice, setChoice] = useState("");
  const regHandler = () => setChoice("reg");

  const submitForm = async (data) => {
    let url = "http://localhost:8000/api/login/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Form begins here
  const form = (
    <div className="form">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="loginForm">
          <h1>Sign in to your account</h1>
          <br />
          <br />
          <label>User Name</label>register
          <input
            type="username"
            placeholder="User Name"
            name="username"
            ref={register({
              required: true,
            })}
          />
          <ErrorMessage error={errors.username} />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.password} />
          <button type="submit">Sign in to your accounts</button>
          <br />
          <br />
          <h3>Don't have an account?</h3>
          <button onClick={regHandler}>Sign Up</button>
        </div>
      </form>
    </div>
  );
  const reg = <RegistrationForm />;
  return <div>{choice === "" ? form : reg}</div>;
};
export default LoginForm;

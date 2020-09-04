//import dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";

//import modules
import RegistrationForm from "./signup/registration_form";
import ErrorMessage from "./signup/errorMessages";

const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [choice, setChoice] = useState("");
  const regHandler = () => setChoice("reg");

  //function to handle form submission
  const submitForm = async (data) => {
    // variable to hold converted form data
    let formBody = [];
    //loop through received data and convert it into FormData()
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let url = "http://localhost:8000/api/login/";

    //post converted form data for django and recieve success status as boolean
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
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

//exporting form logic
export default LoginForm;

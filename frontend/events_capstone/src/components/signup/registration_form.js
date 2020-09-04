//Event registration app registration component

//import dependencies
import React, { Component, useRef } from "react";
import { useForm } from "react-hook-form";

//module imports
import "./styles.css";
import ErrorMessage from "./errorMessages";

//registration function component
const MainForm = () => {
  //destructuring feature methods from useForm() - "react-use-form"
  const { register, handleSubmit, errors, watch } = useForm();

  //keeping watch for the password form field to make comparison with the confirm password field
  const password = useRef({});
  password.current = watch("password", "");

  //function to handle form submission
  const onSubmit = async (data) => {
    console.log("The data is:", data);

    let url = "http://localhost:8000/api/register/";

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

  return (
    <>
      {/* registration form */}
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration</h1>
        <label>First Name:</label>
        <input
          name="first_name"
          ref={register({ required: true, minLength: 2 })}
        />
        <ErrorMessage error={errors.first_name} />

        <label>Last Name:</label>
        <input
          name="last_name"
          ref={register({ required: true, minLength: 2 })}
        />
        <ErrorMessage error={errors.last_name} />

        <label>User Name:</label>
        <input
          name="username"
          ref={register({ required: true, minLength: 2 })}
        />
        <ErrorMessage error={errors.username} />

        <label>Email</label>
        <input
          name="email"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <ErrorMessage error={errors.email} />

        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({
            required: true,
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})/i,
              message: "invalid password",
            },
          })}
        />

        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          ref={register({
            required: true,
            validate: (value) =>
              value === password.current || "Passwords do not match.",
          })}
        />
        <ErrorMessage error={errors.confirmPassword} />

        <span>
          <label className="checkbox">
            <input
              type="checkbox"
              name="terms"
              ref={register({
                required: true,
              })}
            />
            I agree with the terms and conditions.
          </label>
        </span>
        {/* <ErrorMessage error={errors.terms} /> */}
        {errors.terms && (
          <p>You need to accept the terms and conditions to proceed.</p>
        )}

        <button type="submit">Confirm Registration</button>
      </form>
    </>
  );
};

class RegistrationForm extends Component {
  render() {
    return (
      <>
        <MainForm />
      </>
    );
  }
}

export default RegistrationForm;

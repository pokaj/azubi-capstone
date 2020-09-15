//Event registration app registration component

//import dependencies
import React, { Component, useRef, useState } from "react";
import { useForm } from "react-hook-form";

//module imports
import "./styles.css";
import ErrorMessage from "./errorMessages";
import LoginForm from "../login/LoginForm";
import swal from "sweetalert";

//registration function component...
const MainForm = () => {
  //state hook to handle which form is displayed
  const [form, setForm] = useState(true);
  const getForm = () => setForm(!form);

  //destructuring feature methods from useForm() - "react-use-form"...
  const { register, handleSubmit, errors, watch } = useForm();

  //keeping watch for the password form field to make comparison with the confirm password field...
  const password = useRef({});
  password.current = watch("password", "");

  //function to handle form submission...
  const onSubmit = async (data, e) => {
    console.log("The data is:", data);

    //url to bacnkend for registration...to be stored in a seperate file as a secrete later...
    let url = "http://localhost:8000/api/register/";

    //method to submit form data and receive reponse data asynchronously
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        //interactive display(alerts) on successful/unsuccessful user login attempt
        if (data.status === true) {
          e.target.reset();
          swal(
            "Success",
            "You're successfully registered to the Azubi event booking platform",
            "success"
          ).then((value) => getForm());
        } else {
          swal(
            "Error",
            `Your registration was unsuccessful: ${data["error-message"]}`,
            "warning",
            {
              buttons: {
                cancel: "Close",
              },
            }
          );
        }

        console.log("success", data);
      })
      .catch((error) => {
        swal(
          "Error",
          "Your registration was unsuccessful, please retry",
          "warning"
        );
        console.error("Error:", error);
      });
  };

  //variable to hold registration form
  let registrationForm = (
    <>
      <div className="backgroundbg">
        {/* registration form */}

        <div className="login-page">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Registration</h1>

            {/* lables along with form fields */}

            <ErrorMessage error={errors.first_name} />
            <input
              name="first_name"
              placeholder="First Name"
              ref={register({ required: true, minLength: 2 })}
            />

            {/* Error messages to be displayed for their respective fields*/}

            <ErrorMessage error={errors.last_name} />
            <input
              name="last_name"
              placeholder="Last Name"
              ref={register({ required: true, minLength: 2 })}
            />

            <ErrorMessage error={errors.username} />
            <input
              name="username"
              placeholder="User Name"
              ref={register({ required: true, minLength: 2 })}
            />

            <ErrorMessage error={errors.email} />
            <input
              name="email"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />

            <ErrorMessage error={errors.password} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={register({
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})/i,
                  message: "invalid password",
                },
              })}
            />

            <ErrorMessage error={errors.confirmPassword} />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              ref={register({
                required: true,
                validate: (value) =>
                  value === password.current || "Passwords do not match.",
              })}
            />

            <button type="submit" placeholder="Confirm Registration">
              Sign up
            </button>
            <p className="message">
              Already registered?
              <a href="/#" onClick={getForm}>
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );

  return form ? registrationForm : <LoginForm />;
};

//class to render returned form function form
class RegistrationForm extends Component {
  render() {
    return (
      <>
        <MainForm />
      </>
    );
  }
}

//exporting registrationform logic
export default RegistrationForm;

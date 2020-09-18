//import dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Redirect } from "react-router";
import { useGlobalStateStore } from "../../store/globalContext";

//import modules
import RegistrationForm from "../signup/registration_form";
import ErrorMessage from "../signup/errorMessages";

const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [choice, setChoice] = useState("");
  const regHandler = () => setChoice("reg");

  //getting global staue for login status
  const globalUserStateStore = useGlobalStateStore();

  const [redirect, setRedirect] = useState({ status: false });

  //function to handle form submission
  const submitForm = async (data, e) => {
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
        //interactive display on successful/unsuccessful user login
        if (data.status === true) {
          //onSuccess
          e.target.reset();
          //redirect to homepage once login is successful
          globalUserStateStore.addCurrentUserData(data);
          globalUserStateStore.onLogIn();

          setRedirect({ status: true });
        } else {
          //onFailed
          swal(
            "Error",
            `unsuccessful login: ${data["error-message"]}`,
            "error",
            {
              buttons: {
                cancel: "Close",
              },
            }
          );
        }
        console.log("Success", data);
      })
      .catch((error) => {
        //sonError
        swal("Error", "Login failure, please retry", "error");
        console.error("Error:", error);
      });
  };

  //Login Form Component
  const form = (
    <div className="backgroundbg">
      <div className="login-page">
        <div className="form">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="loginForm">
              <h1>SIGN IN</h1>
              <br />
              <br />

              <ErrorMessage error={errors.username} />
              <input
                type="username"
                placeholder="User Name"
                name="username"
                ref={register({
                  required: true,
                })}
              />

              <ErrorMessage error={errors.password} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                ref={register({ required: true })}
              />

              <button type="submit">Login</button>
              <br />
              <br />

              <p className="message">
                Not registered?{" "}
                <a href="/#" onClick={regHandler}>
                  Create an account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  //reference to registration form component
  const reg = <RegistrationForm />;
  //re-routing to homepage after clicking okay on the login alert...
  if (redirect.status) return <Redirect push to="/home" />;

  //dynamically pick which page to display
  return <>{choice === "" ? form : reg}</>;
};

//exporting form logic
export default LoginForm;

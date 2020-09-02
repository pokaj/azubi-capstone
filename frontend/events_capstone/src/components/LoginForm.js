import React, { Component } from "react";
import InputField from "./loginComponents/InputField";
import SubmitButton from "./loginComponents/SubmitButton";
import UserStore from "./loginComponents/stores/Userstore";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    this.setState({
      [property]: val,
    });
  }

  //Function to reset the form incase of error
  resetForm() {
    this.setState({
      email: "",
      password: "",
      buttonDisabled: false,
    });
  }

  //function to to login
  async doLogin() {
    if (!this.state.email) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });

    /**
     * API for the Login
     */
    try {
      let res = await fetch("./login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return (
      <>
        <form>
          <div className="loginForm">
            Sign in to your account
            <br />
            <br />
            Your email
            <InputField
              type="email"
              placeholder="Email"
              value={this.state.email ? this.state.email : ""}
              onChange={(val) => this.setInputValue("email", val)}
            />
            Password
            <InputField
              type="password"
              placeholder="Password"
              value={this.state.password ? this.state.password : ""}
              onChange={(val) => this.setInputValue("password", val)}
            />
            <SubmitButton
              text="Sign in to your accounts"
              disable={this.state.buttonDisabled}
              onClick={() => this.doLogin()}
            />
          </div>
        </form>
      </>
    );
  }
}
export default LoginForm;

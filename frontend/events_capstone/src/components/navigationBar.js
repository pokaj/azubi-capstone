import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import Context from "../store/context";

import Styled from "styled-components";

const Styles = Styled.div`

.navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }

`;

const NavigationBar = () => {
  const { globalState } = useContext(Context);

  //handles user logout for both frontend and backend upon click of logout button
  const handleLogout = (data) => {
    let url = "http://localhost:8000/api/logout/";

    // variable to hold converted form data
    let formBody = [];
    //loop through received data and convert it into FormData()
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(url, {
      method: "POST",
      headers: {
        Token: globalState.currentUser.token,
        "Content-Type": "application/json",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        //interactive display(alerts) on successful/unsuccessful user loginout attempt

        swal("Success", "You're logged out", "success");

        console.log("success", data);
      })
      .catch((error) => {
        swal("Error", "Failed to logout, please retry", "warning");
        console.error("Error:", error);
      });
  };

  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="#/">Azubi Event Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/eventsListings">
                Events Listings
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                onClick={() =>
                  handleLogout({
                    username: globalState.currentUser.username,
                    Token: globalState.currentUser.token,
                  })
                }
                className="nav-link"
                to="/"
              >
                Log Out
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;

import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import Context from "../store/context";
import axios from "axios";

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

  .navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
    color: #bbb;
}



`;

const NavigationBar = () => {
  const { globalState, globalDispatch } = useContext(Context);

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

    const myHeaders = new Headers();
    myHeaders.append(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
    myHeaders.append("Token", `${globalState.currentUser.token}`);

    try {
      axios({
        method: "post",
        url: url,
        data: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Token: globalState.currentUser.token,
          Authorization: `Bearer ${globalState.currentUser.token}`,
        },
      })
        .then(function (response) {
          //success
          globalDispatch({ type: "LOGOUT" });
          swal("Success", "You're logged out", "success");

          console.log(response);
        })
        .catch(function (response) {
          globalDispatch({ type: "LOGOUT" });

          // on failed loggout error
          swal("Error", "Failed to logout, please retry", "warning");
          console.log(response);
        });
    } catch (e) {}

    // fetch(url, {
    //   method: "POST",
    //   mode: "cors",
    //   headers: myHeaders,
    //   body: formBody,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //interactive display(alerts) on successful/unsuccessful user loginout attempt

    //     swal("Success", "You're logged out", "success");

    //     console.log("success", data);
    //   })
    //   .catch((error) => {
    //     swal("Success", "You're logged out", "success");
    //     globalDispatch({ type: "LOGOUT" });

    //     // swal("Error", "Failed to logout, please retry", "warning");
    //     console.error("Error:", error);
    //   });
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
              <NavLink className="nav-link" to="/myEventsPage">
                My Events
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                onClick={() =>
                  handleLogout({
                    username: globalState.currentUser.username,
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

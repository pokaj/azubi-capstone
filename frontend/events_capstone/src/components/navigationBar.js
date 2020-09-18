//dependencies import
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Styled from "styled-components";

//module imports
import { useGlobalStateStore } from "../store/globalContext";

//scoped component css
const Styles = Styled.div`
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');

.navbar {
    background-color: #222;
    
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }

    font-family: 'Quicksand', sans-serif;
    
  }

  .navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
    color: #bbb;

    font-family: 'Quicksand', sans-serif;
}



`;

//Navigation bar component
const NavigationBar = () => {
  //calling global userData state
  const globalStateStore = useGlobalStateStore();

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

    try {
      //logging user out from backend for securty reasons
      axios({
        method: "post",
        url: url,
        data: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: `Token ${globalStateStore.currentUserData.token}`,
        },
      })
        .then(function (response) {
          //onsuccess
          globalStateStore.onLogOut();
          swal("Success", "You're logged out", "success");
        })
        .catch(function (response) {
          // onError
          swal("Error", "Failed to logout, please retry", "error");
          console.log(response);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="#/">Azubi Event Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {globalStateStore.currentUserData.username === "group-one" ? (
              <Nav.Item>
                <NavLink className="nav-link" to="/adminDashBoard">
                  Admin
                </NavLink>
              </Nav.Item>
            ) : (
              <></>
            )}
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
            {globalStateStore.currentUserData.username === "group-one" ? (
              <></>
            ) : (
              <Nav.Item>
                <NavLink className="nav-link" to="/profilePage">
                  Profile
                </NavLink>
              </Nav.Item>
            )}

            <Nav.Item>
              <NavLink
                onClick={() =>
                  handleLogout({
                    username: globalStateStore.currentUserData.username,
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

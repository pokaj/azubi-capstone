import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Styled from "styled-components";
import { Link } from "react-router-dom";

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
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="#/">Azubi Event Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <NavLink to="/home">Home</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/eventsListings">Events Listings</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/eventRegistrationAndEditForm">Add Event</NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;

import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import peopleImage from "../assets/images/bg2.jpg";

const Styles = styled.div`
  .jumbo {
    background: url(${peopleImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 250px;
    margin-bottom: 0;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1>Welcome</h1>
        <p>Click to register for events</p>
      </Container>
    </Jumbo>
  </Styles>
);

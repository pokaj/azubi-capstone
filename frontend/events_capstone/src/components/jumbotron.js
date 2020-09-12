import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import peopleImage from "../assets/images/bg2.jpg";

const Styles = styled.div`
  .jumbo {
    // background: url(${peopleImage}) no-repeat fixed bottom;
    // background-size: cover;
    background: rgb(6, 6, 6);
    background: linear-gradient(
      90deg,
      rgba(6, 6, 6, 1) 15%,
      rgba(50, 49, 49, 1) 30%,
      rgba(148, 144, 144, 1) 50%,
      rgba(60, 58, 58, 1) 70%,
      rgba(0, 0, 0, 1) 85%
    );
    color: #efefef;
    height: 250px;
    margin-bottom: 0;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background: url(${peopleImage}) no-repeat fixed bottom;
    background-size: cover;

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

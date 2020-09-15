import React, { useContext } from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import peopleImage from "../assets/images/bg2.jpg";
import Context from "../store/context";

const Styles = styled.div`
  .jumbo {
    background: rgb(205, 157, 157);
    background: radial-gradient(
        circle,
        rgba(205, 157, 157, 0) 0%,
        rgba(63, 59, 59, 0.4598214285714286) 88%,
        rgba(52, 52, 52, 1) 98%
      ),
      url(${peopleImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: fixed bottom;
    color: #efefef;
    height: 450px;
    margin-bottom: 0;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background: rgb(52, 40, 40);
    background: linear-gradient(
      180deg,
      rgba(52, 40, 40, 0) 0%,
      rgba(52, 40, 40, 1) 97%
    );

    // background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

//jumbotron to display on the top of the home page
export const Jumbotron = () => {
  //getting global staue for login status
  const { globalState } = useContext(Context);
  return (
    <Styles>
      <Jumbo fluid className="jumbo">
        <div className="overlay"></div>
        <Container>
          <h1>Welcome {globalState.currentUser.first_name}</h1>
          <p>Click on an event to register for it</p>
        </Container>
      </Jumbo>
    </Styles>
  );
};

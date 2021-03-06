import { useObserver } from "mobx-react";
import React from "react";
import { useGlobalStateStore } from "../store/globalContext";

import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import peopleImage from "../assets/images/bg2.jpg";

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

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

//jumbotron/image to display on the top of the home page
export const Jumbotron = () => {
  //getting global staue for login status
  // const { globalState } = useContext(Context);

  const globalUserState = useGlobalStateStore();

  return useObserver(() => (
    <Styles>
      <Jumbo fluid className="jumbo">
        <div className="overlay"></div>
        <Container fluid>
          <h1>Welcome {globalUserState.currentUserData.username}</h1>
          <h5>Click on an event's image to register for it</h5>
        </Container>
      </Jumbo>
    </Styles>
  ));
};

import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Col,
  Row,
  Jumbotron,
  Button,
  Image,
  Card,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Context from "../store/context";
import swal from "sweetalert";
import styled from "styled-components";
import bg from "../assets/images/jumbo2Bg.jpg";

const Styles = styled.div`
  .overlay {
    background: url(${bg}) no-repeat fixed bottom;
    background-size: cover;
    margin-top: 20px;
    height: 400px;
  }
`;

function MyVerticallyCenteredModal(props) {
  let { currentEvent } = { ...props };
  console.log("yjkbkj", currentEvent);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {currentEvent["username"]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyEventsPage() {
  const { globalState } = useContext(Context);
  const [userEvents, setUserEvents] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  useEffect(() => {
    // variable to hold converted form data
    let formBody = [];

    let userEmail = { email: globalState.currentUser.email };
    //loop through received data and convert it into FormData()
    for (var property in userEmail) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(userEmail[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    // let url = "http://localhost:8000/api/myevents";
    let url = "http://localhost:8000/api/events/";

    //post converted form data for django and recieve success status as boolean
    fetch(url, {
      // method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      // body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(`the users events are: ${JSON.stringify(data)}`);
        setUserEvents(data);
      })
      .catch((error) => {
        swal("Error", "Login failure, please retry", "warning");
        console.error("Error:", error);
      });
  }, [globalState.currentUser.email, setUserEvents]);

  const showDetails = () => {
    return (
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    );
  };
  return (
    <>
      <Styles>
        <div>
          <Container style={{ width: "85%" }} fluid>
            <Jumbotron className="overlay">
              <h2>
                Welcome {globalState.currentUser.username} this is your
                dashboard
              </h2>
              <p>You can edit events you've registered for from here.</p>
              <Link to="/about">
                <Button className="btn-secondary">All Events</Button>
              </Link>
            </Jumbotron>
            <Row
              xs={1}
              sm={2}
              md={2}
              xl={5}
              lg={3}
              className="show-grid text-center"
            >
              {userEvents.map((event) => {
                return (
                  <Col xs={12} sm={4} className="person-wrapper">
                    <Image
                      onClick={() => {
                        setCurrentEvent(event);
                        setModalShow(true);
                      }}
                      roundedCircle
                      style={{
                        height: "200px",
                        width: "200px",
                      }}
                      src={event.image}
                      className="profile-pic"
                    />
                    <h5>{event.name}</h5>
                    <p>{event.topic}</p>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </Styles>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentEvent={currentEvent}
      />
    </>
  );
}

export default MyEventsPage;

import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Jumbotron, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import Context from "../store/context";
import swal from "sweetalert";

function MyEventsPage() {
  const { globalState } = useContext(Context);
  const [userEvents, setUserEvents] = useState({});

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

    let url = "http://localhost:8000/api/myevents";

    //post converted form data for django and recieve success status as boolean
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`the users events are: ${JSON.stringify(data)}`);
        setUserEvents(data);
      })
      .catch((error) => {
        swal("Error", "Login failure, please retry", "warning");
        console.error("Error:", error);
      });
  }, [globalState.currentUser.email]);
  return (
    <>
      <Container>
        <Jumbotron>
          <h2>Welcome to your dashboard</h2>
          <p>You can edit events you've registered for from here.</p>
          <Link to="/about">
            <Button bsStyle="primary">Learn More</Button>
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
          {/* {userEvents.map((event) => {
            return (
              <Col xs={12} sm={4} className="person-wrapper">
                <Image
                  src="assets/person-1.jpg"
                  circle
                  className="profile-pic"
                />
                <h3>{event.name}</h3>
                <p>
                  That's a crooked tree. We'll send him to Washington. These
                  little son of a guns hide in your brush and you just have to
                  push them out.
                </p>
              </Col>
            );
          })} */}
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-2.jpg" circle className="profile-pic" />
            <h3>Vanessa</h3>
            <p>
              That's a crooked tree. We'll send him to Washington. These little
              son of a guns hide in your brush and you just have to push them
              out.
            </p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-3.jpg" circle className="profile-pic" />
            <h3>Riff</h3>
            <p>
              That's a crooked tree. We'll send him to Washington. These little
              son of a guns hide in your brush and you just have to push them
              out.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyEventsPage;

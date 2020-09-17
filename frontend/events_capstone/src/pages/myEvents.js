//dependencies imports
import React, { useState, useEffect, Component } from "react";
import {
  Container,
  Col,
  Row,
  Jumbotron,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import styled from "styled-components";
import axios from "axios";

//modules imports
import bg from "../assets/images/jumbo2Bg.jpg";
import { useGlobalStateStore } from "../store/globalContext";

//scoped css for component
const Styles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Arvo:ital,wght@1,700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@700;800&display=swap");

  .jumboOverlay {
    background: url(${bg}) no-repeat fixed bottom;
    background-size: cover;
    margin-top: 20px;
    height: 400px;
    color: white;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Arvo", serif;
  }

  h5,
  p {
    color: white;
  }
  .nanum {
    font-family: "Nanum Gothic", sans-serif;
  }
`;

//modal component
function MyVerticallyCenteredModal(props) {
  let { currentevent } = { ...props };
  const globalStateStore = useGlobalStateStore();

  const handleUnregister = (id) => {
    let url = "http://localhost:8000/api/unattend";
    let email = globalStateStore.currentUserData.email;

    let data = { event_id: id, email: email };
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
      //Un-register user from event
      axios({
        method: "post",
        url: url,
        data: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then(function (response) {
          //onsuccess
          if (response.data.status === true) {
            props.onHide();
            props.refreshPage();

            swal("Success", "You're successuly unbooked this event", "success");
          } else {
            props.onHide();

            swal(
              "Error",
              `failed to unbook event: ${response.data.message}`,
              "error",
              {
                buttons: {
                  cancel: "Close",
                },
              }
            );
          }
        })
        .catch(function (response) {
          // onError
          swal("Error", "Failed to logout, please retry", "error", {
            buttons: {
              cancel: "Close",
            },
          });
          console.log(response);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="nanum">
          {currentevent.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="nanum">
          <i>Topic:</i> {currentevent.topic}
        </h4>
        <center className="nanum">Details:</center>
        <center>
          <small>
            On the: {currentevent.date} | starts at: {currentevent.start_time} |
            ends at: {currentevent.end_time}
          </small>
        </center>
        <center className="nanum">Speaker(s): {currentevent.speaker}</center>
        <center>Location: {currentevent.location}</center>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleUnregister(currentevent.id)}
        >
          Un-register
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

//events page component(main page)
const EventsPageMainComponent = ({
  mEvents,
  uEvents,
  aEvents,
  refreshPage,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [currentevent, setCurrentEvent] = useState({});

  const [myEvents, setMyEvents] = useState({ count: 0, data: [] });
  const [allEvents, setAllEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  //global state
  const globalStateStore = useGlobalStateStore();

  return (
    <>
      <Styles>
        <div>
          <Container style={{ width: "85%" }} fluid>
            <Jumbotron className="jumboOverlay">
              <h1>
                Welcome {globalStateStore.currentUserData.username}, this is
                your dashboard
              </h1>
              <h4>You can edit events you've registered for from here.</h4>
              <Link to="/home">
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
              {/* {console.log("the proble is:", userEvents)} */}
              {uEvents.map((event, key) => {
                return (
                  <Col xs={12} sm={4} className="person-wrapper" key={key}>
                    <Image
                      onClick={() => {
                        setCurrentEvent(event);
                        setModalShow(true);
                      }}
                      rounded
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
      {modalShow ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          currentevent={currentevent}
          refreshPage={refreshPage}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

class MyEventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: [],
      allEvents: [],
      myEvents: { count: 0, data: [] },
    };
  }

  getEvents = () => {
    // variable to hold converted form data
    let formBody = [];
    let tempUserInfo = localStorage.getItem("currentUserData");
    let tempUserData = JSON.parse(tempUserInfo);

    let userEmail = { email: tempUserData.email };

    //loop through received data and convert it into FormData()
    for (var property in userEmail) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(userEmail[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let url = "http://localhost:8000/api/myevents";

    //post converted form data for django and recieve success status as boolean

    //fetching  the current user's booked events from endpoint
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        // setMyEvents({ count: data.count, data: data.data });
        this.setState({ myEvents: { count: data.count, data: data.data } });

        //
        let url2 = "http://localhost:8000/api/events/";

        // fetching all events from endpoint
        fetch(url2, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ allEvents: data });

            let tempArray = [];
            this.state.myEvents.data.forEach((eventData) => {
              let tempH = this.state.allEvents.find(
                (cevent) => eventData.event === cevent.name
              );
              tempArray.push(tempH);

              // this.setState({ userEvents: [...this.state.userEvents, tempH] });
            });
            this.setState({ userEvents: [...tempArray] });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <>
        <EventsPageMainComponent
          mEvents={this.state.myEvents}
          uEvents={this.state.userEvents}
          aEvents={this.state.allEvents}
          refreshPage={this.getEvents}
        />
      </>
    );
  }
}
export default MyEventsPage;

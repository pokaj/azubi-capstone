//dependencies imports

import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Card,
  Col,
  Row,
  Modal,
  OverlayTrigger,
  Button,
  Image,
  Popover,
} from "react-bootstrap";
import swal from "sweetalert";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useObserver } from "mobx-react";

//components/models imports
import { Jumbotron } from "../components/jumbotron";
import ErrorMessage from "../components/signup/errorMessages";
import { useGlobalStateStore } from "../store/globalContext";
import more from "../assets/images/more.svg";

//variable to hold custom scoped styled sheet using "styled component" component
const Styles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Arvo:ital,wght@1,700&display=swap");

  .pageBackground {
    // background: rgb(6, 6, 6);
    // background: linear-gradient(
    //   90deg,
    //   rgba(6, 6, 6, 1) 15%,
    //   rgba(50, 49, 49, 1) 30%,
    //   rgba(148, 144, 144, 1) 50%,
    //   rgba(60, 58, 58, 1) 70%,
    //   rgba(0, 0, 0, 1) 85%
    // );
    // background-color: #cd9d9d;
  }
  .homeBgImg {
    padding-top: 10px;
    background-color: #342828;
  }

  .cardTitle {
    padding: 0;
    margin: 0;
    font-family: "Roboto Slab", serif;
    overflow: hidden;
    text-overflow: ellipsis;
    // white-space: nowrap;
    text-overflow: ellipsis;
    height: 1.5rem;
  }

  .cardText {
    padding: 0;
    margin: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
    height: 20px;
    overflow: ellipsis;
  }

  .blockquote-footer {
    text-overflow: ellipsis;
  }

  .row {
    margin: auto;
  }

  .coldiv {
    width: 18rem;
    margin: auto;
  }

  .itimfont {
    font-family: "Itim", cursive;
  }

  .arvofont {
    font-family: "Arvo", serif;
  }
`;

//function to dynamically render event cards
const Home = ({ cards, refreshEventsData }) => {
  //state hooks
  const [modalShow, setModalShow] = useState(false);
  const [event, setEvent] = useState({ eventData: { name: "" } });

  return (
    <>
      <Styles>
        <Jumbotron />
        <div className="pageBackground">
          <Container fluid className="homeBgImg">
            <div className="container-fluid">
              {cards.length === 0 ? (
                <div>Sorry there are currently no event available...</div>
              ) : (
                <center>
                  <Row xs={1} sm={2} md={2} xl={5} lg={3}>
                    {/* mapping received events data from backends onto dynamically generated card views  */}
                    {cards.map((event, key) => {
                      console.log("image link:", event.image);
                      let seatsRemaining =
                        event.room_capacity - event.current_seat_number;
                      return (
                        <div key={key}>
                          <Col
                            style={{
                              width: "16rem",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            <Card
                              style={{
                                width: "16rem",
                                border: 0,
                                marginBottom: "18px",
                              }}
                              key={key}
                            >
                              <Card.Img
                                onClick={() => {
                                  setEvent({ eventData: event });
                                  setModalShow(true);
                                }}
                                variant="top"
                                src={event.image}
                                style={{ height: "220px" }}
                              />
                              <Card.Body style={{ padding: "2px" }}>
                                <center>
                                  <Card.Title className="cardTitle">
                                    {event.name}
                                  </Card.Title>
                                </center>

                                <Card.Text className="cardText">
                                  <b className="text-right font-italic">
                                    On the:
                                  </b>
                                  <small>{`${event.date.substring(5)} `}</small>
                                  <b className="text-right font-italic">
                                    Begins at:
                                  </b>
                                  <small>
                                    {` ${event.start_time.substring(0, 5)}`}
                                  </small>
                                </Card.Text>
                                <Button
                                  style={{ width: "40px" }}
                                  className="invisible"
                                ></Button>

                                <small className="font-weight-bold">
                                  {`${seatsRemaining} `} seats remaining
                                </small>
                                {/* Popup view component to show more event details when the user hovers on more icon */}
                                <OverlayTrigger
                                  trigger={["hover", "focus"]}
                                  placement="auto"
                                  overlay={
                                    <Popover id="popover-basic">
                                      <Popover.Title as="h3">
                                        {event.name}
                                      </Popover.Title>
                                      <Popover.Content>
                                        {event.topic}
                                        <small>
                                          <p>Speaker: {event.speaker}</p>
                                          Location: {event.location}
                                          <p>
                                            Ends at:{" "}
                                            {event.end_time.substring(0, 5)} GMT
                                          </p>
                                        </small>
                                      </Popover.Content>
                                    </Popover>
                                  }
                                >
                                  <Button
                                    variant="light"
                                    className="d-inline-flex align-items-center"
                                  >
                                    <Image
                                      style={{
                                        height: "20px",
                                        width: "20px",
                                      }}
                                      roundedCircle
                                      src={more}
                                      fluid
                                    />
                                  </Button>
                                </OverlayTrigger>

                                <footer
                                  className="blockquote-footer"
                                  style={{
                                    height: "20px",
                                    overflow: "hidden",
                                    textoverflow: "ellipsis",
                                  }}
                                >
                                  {" "}
                                  <small className="text-muted">
                                    "{event.tagline}"
                                  </small>
                                </footer>
                              </Card.Body>
                            </Card>
                          </Col>
                        </div>
                      );
                    })}
                  </Row>
                </center>
              )}
            </div>
          </Container>
        </div>
      </Styles>
      {modalShow ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          eventData={event["eventData"]}
          getNewEventsData={refreshEventsData}
          displayModal={setModalShow}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

//function to hold modal sheet to display on-click of event card
const MyVerticallyCenteredModal = (props) => {
  const globalUserState = useGlobalStateStore();

  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      event_id: 0,
      email: globalUserState.currentUserData.email,
    },
  });

  let event = { ...props };

  //function to handle event booking form submission
  const onSubmit = async (data, e) => {
    //validates the availability of the eventa bout to be booked and displays an
    //alert in the case of the event being unavaible eg:fully booked events
    if (event.eventData.current_seat_number >= event.eventData.room_capacity)
      return swal("Booked Out", "Sorry this event is fully booked", "warning");

    // variable to hold converted form data
    let formBody = [];
    //loop through received data and convert it into FormData()
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    let url = "http://localhost:8000/api/attend";
    console.log(`The form data is ${formBody}`);
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
        //onSuccess
        //interactive display on successful/unsuccessful booking of an event
        if (data.status === true) {
          e.target.reset();
          event.displayModal(false);
          event.getNewEventsData();
          //alert the user that event booking has been a success
          swal("Success", "Event booked successfully", "success");
        } else {
          //onFailed Booking
          event.displayModal(false);
          swal(
            "Error",
            `unsuccessful event booking: ${data["message"]}`,
            "error",
            {
              buttons: {
                cancel: "Close",
              },
            }
          );
        }
      })
      .catch((error) => {
        //onError
        event.displayModal(false);
        swal("Error", "Failed to book event, please retry", "error");
        console.error("Error:", error);
      });
  };

  //function to run and set default data whenever this component is run
  useEffect(() => {
    let id = event.eventData.id;
    setValue("event_id", id);
  });

  //making component aware and listen to global state
  return useObserver(() => (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Card className="bg-dark text-white">
        <Card.Img
          src={event.eventData.image}
          alt="Overlay Image"
          style={{ opacity: "0.4" }}
        />
        <Card.ImgOverlay style={{ opacity: "0.8" }}>
          <Card.Title>{event.eventData.name}</Card.Title>
          <Card.Text>
            By: <small>{event.eventData.speaker}</small>
          </Card.Text>
          <div className="login-page">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <h1 style={{ color: " #206a5d" }}>Join Event</h1>

              {/* lables along with form fields and their validation */}

              <ErrorMessage error={errors.event_id} />
              <input
                type="hidden"
                name="event_id"
                placeholder="Event Id"
                ref={register({ required: true })}
              />

              <ErrorMessage error={errors.email} />
              <input
                name="email"
                placeholder="Email"
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />

              <button type="submit" placeholder="Confirm Registration">
                Join
              </button>
            </form>
          </div>
        </Card.ImgOverlay>
      </Card>
    </Modal>
  ));
};

//class component to render functional components
export default class HomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cards: [],
      reRender: false,
    };
  }

  // function to handle the fetching of data on page load
  getEvents = () => {
    let url = "http://localhost:8000/api/events/";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ cards: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //calls getEvents to fetch new data whenever page loads
  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <>
        <Home cards={this.state.cards} refreshEventsData={this.getEvents} />
      </>
    );
  }
}

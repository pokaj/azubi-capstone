//dependencies imports

import React, { Component, useState, useEffect } from "react";
import { Container, Card, Col, Row, Modal } from "react-bootstrap";
import swal from "sweetalert";
import styled from "styled-components";
import { useForm } from "react-hook-form";

//components/models imports
import { Jumbotron } from "../components/jumbotron";
import ErrorMessage from "../components/signup/errorMessages";

//variable to hold custom scoped styled sheet using "styled component" component
const Styles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Arvo:ital,wght@1,700&display=swap");

  .homeBgImg {
    padding-top: 10px;
    background: rgb(6, 6, 6);
    background: linear-gradient(
      90deg,
      rgba(6, 6, 6, 1) 15%,
      rgba(50, 49, 49, 1) 30%,
      rgba(148, 144, 144, 1) 50%,
      rgba(60, 58, 58, 1) 70%,
      rgba(0, 0, 0, 1) 85%
    );
  }

  .cardTitle {
    font-family: "Itim", cursive;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cardText {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cardTe {
    height: 80px;
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
  const [modalShow, setModalShow] = useState(false);
  const [event, setEvent] = useState({ eventData: { name: "" } });

  return (
    <>
      <Styles>
        <Jumbotron />

        <Container fluid className="homeBgImg">
          <div className="container-fluid">
            {cards.length === 0 ? (
              <div>Sorry there are currently no events available...</div>
            ) : (
              <Row xs={1} sm={2} md={2} xl={5} lg={3}>
                {cards.map((event, key) => {
                  let seatsRemaining =
                    event.room_capacity - event.current_seat_number;
                  return (
                    <div
                      onClick={() => {
                        setEvent({ eventData: event });
                        setModalShow(true);
                      }}
                    >
                      <Col>
                        <Card
                          style={{
                            width: "16rem",
                            border: 0,
                            marginBottom: "18px",
                          }}
                          key={key}
                        >
                          <Card.Img
                            variant="top"
                            src={event.image}
                            style={{ height: "220px" }}
                          />
                          <Card.Body>
                            <Card.Title className="cardTitle">{`${
                              event.name
                            } | ${event.date.substring(5)}`}</Card.Title>
                            <div className="cardTe">
                              <Card.Text cardText>{event.topic}</Card.Text>
                            </div>
                            <center>
                              <small className="font-weight-bold">
                                {`${seatsRemaining} `} seats remaining
                              </small>
                            </center>
                            <footer
                              className="blockquote-footer"
                              style={{
                                height: "20px",
                                overflow: "hidden",
                                textoverflow: "ellipsis",
                              }}
                            >
                              <small className="text-muted">
                                "{event.tagline}"
                                <cite title="Source Title">
                                  {`  on the: ${event.date.substring(5)}`}
                                </cite>
                              </small>
                            </footer>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  );
                })}
              </Row>
            )}
          </div>
        </Container>
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
  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: { event_id: 0 },
  });

  let event = { ...props };
  // console.log(`the props are: ${event.eventData.name}`);

  //function to handle event booking form submission
  const onSubmit = async (data, e) => {
    //validates the availability of the eventa bout to be booked and displays an
    //alert in the case of the event being unavaible eg:fully booked events
    if (event.eventData.current_seat_number >= event.eventData.room_capacity)
      return;
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
        //interactive display on successful/unsuccessful booking of an event
        if (data.status === true) {
          e.target.reset();
          event.displayModal(false);
          event.getNewEventsData();
          //alert the user that event booking has been a success
          swal("Success", "Event booked successfully", "success");
        } else {
          swal(
            "Error",
            `unsuccessful event booking: ${data["error-message"]}`,
            "warning",
            {
              buttons: {
                cancel: "Close",
              },
            }
          );
        }
        console.log("Success", data);
      })
      .catch((error) => {
        swal("Error", "Event booking failed, please retry", "warning");
        console.error("Error:", error);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Card className="bg-dark text-white">
        {useEffect(() => {
          let id = event.eventData.id;
          setValue("event_id", id);
        })}
        <Card.Img
          src={event.eventData.image}
          alt="Overlay Image"
          style={{ opacity: "0.4" }}
        />
        <Card.ImgOverlay style={{ opacity: "0.8" }}>
          <Card.Title>{event.eventData.name}</Card.Title>
          <Card.Text>
            By: <small>{event.eventData.speaker}</small>
            <center className="itimfont font-italic">
              Begins at: {` ${event.eventData.start_time}`}{" "}
            </center>
            <p className="text-right arvofont font-italic">
              Ends at: {` ${event.eventData.end_time}`}
            </p>
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
  );
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
    let url = "http://localhost:8000/api/events/ ";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ cards: data });

        console.log("success", data);
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

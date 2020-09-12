import React, { Component, useState } from "react";
import homeBg from "../assets/images/homeBg.jpg";

import { Container, Card, Col, Row, Modal, Button } from "react-bootstrap";
import { Jumbotron } from "../components/jumbotron";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import ErrorMessage from "../components/signup/errorMessages";

const Styles = styled.div`
  .homeBgImg {
    padding-top: 10px;
    // background: url(${homeBg}) no-repeat fixed bottom;
    background-image: url("https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  }

  .modalOverlay {
    background-color: #fff;
    opacity: 0.6;
  }
`;

const Home = ({ cards }) => {
  const [modalShow, setModalShow] = useState(false);
  const [event, setEvent] = useState({ eventData: { name: "awesome" } });

  return (
    <>
      <Styles>
        <div>
          <Jumbotron />

          <Container fluid className="homeBgImg">
            {cards.length === 0 ? (
              <div>Sorry there are currently no events available...</div>
            ) : (
              <Row xs={1} sm={2} md={2} xl={5} lg={3}>
                {cards.map((event, key) => {
                  return (
                    <div
                      onClick={() => {
                        setEvent({ eventData: event });
                        setModalShow(true);
                      }}
                    >
                      <Col>
                        <Card style={{ width: "18rem" }} key={key}>
                          <Card.Img variant="top" src={event.image} />
                          <Card.Body>
                            <Card.Title>{`${
                              event.name
                            } : ${event.date.substring(5)}`}</Card.Title>
                            <Card.Text>{event.topic}</Card.Text>
                            <footer className="blockquote-footer">
                              <small className="text-muted">
                                "{event.tagline}"
                                <cite title="Source Title">
                                  {`  Starts at: ${event.start_time.substring(
                                    0,
                                    5
                                  )}`}
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
          </Container>
        </div>
      </Styles>
      {modalShow ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          eventData={event["eventData"]}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

const MyVerticallyCenteredModal = (props) => {
  const { register, handleSubmit, errors, watch } = useForm();

  let event = { ...props };
  // console.log(`the props are: ${event.eventData.name}`);

  //function to handle form submission
  const onSubmit = async (data, e) => {
    // // variable to hold converted form data
    // let formBody = [];
    // //loop through received data and convert it into FormData()
    // for (var property in data) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(data[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    // let url = "http://localhost:8000/api/login/";
    // //post converted form data for django and recieve success status as boolean
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //   },
    //   body: formBody,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //interactive display on successful/unsuccessful user login
    //     if (data.status === true) {
    //       e.target.reset();
    //       //redirect to homepage once login is successful
    //       swal("Success", "Login successful", "success").then((value) =>
    //         setRedirect({ status: value })
    //       );
    //     } else {
    //       swal(
    //         "Error",
    //         `unsuccessful login: ${data["error-message"]}`,
    //         "warning",
    //         {
    //           buttons: {
    //             cancel: "Close",
    //           },
    //         }
    //       );
    //     }
    //     console.log("Success", data);
    //   })
    //   .catch((error) => {
    //     swal("Error", "Login failure, please retry", "warning");
    //     console.error("Error:", error);
    //   });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Card className="bg-dark text-white">
        <Card.Img src={event.eventData.image} alt="Overlay Image" />
        <Card.ImgOverlay>
          <Card.Title>{event.eventData.name}</Card.Title>
          <Card.Text>
            By: <small>{event.eventData.speaker}</small>
          </Card.Text>
          <div className="login-page">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <h1 style={{ color: " #206a5d" }}>Join Event</h1>

              {/* lables along with form fields */}

              <ErrorMessage error={errors.username} />
              <input
                name="username"
                placeholder="User Name"
                ref={register({ required: true, minLength: 2 })}
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
                Sign up
              </button>
            </form>
          </div>
        </Card.ImgOverlay>
      </Card>
    </Modal>
  );
};

export default class HomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cards: [],
    };
  }

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

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <>
        <Home cards={this.state.cards} />
      </>
    );
  }
}

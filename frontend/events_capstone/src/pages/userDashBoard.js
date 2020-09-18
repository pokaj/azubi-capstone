import React, { Component, useState } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  Table,
  Image,
  Carousel,
} from "react-bootstrap";
import styled from "styled-components";
import image from "../assets/images/landingBg.jpg";

const Styles = styled.div`
  h2 {
    margin: auto;
    text-align: center;
    color: white;
  }
  .table {
    width: 90%;
    margin: auto;
  }

  .item2 {
    grid-area: menu;
  }
  .item3 {
    grid-area: main;
  }
  .item4 {
    grid-area: right;
  }
  .item5 {
    grid-area: footer;
  }
  .item6 {
    grid-area: notFooter;
  }

  .grid-container {
    height: 60vh;
    width: 100%;
    display: grid;
    grid-template-areas:
      "right right right  main main menu"
      "footer footer footer notFooter notFooter menu ";
    grid-gap: 10px;
    padding: 10px;
    color: #fff;
  }

  .grid-container > .grid-item {
    // background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
  }

  .item2 .item3 .item4 .item5 .item6 .grid-item {
    padding: 0;
    margin: 0;
    // width: 20%;
  }

  .image-slider {
    border-raduis: 15px;
    width: 60vw;
    min-width: 67vw;
    height: 55vh;
    padding: 0;
    margin: 0;
  }

  .carousel
    .carousel-inner
    .active
    .slide
    .item2
    .carousel-item
    ol
    li
    .carousel-indicators {
    width: 50vw;
    min-width: 50vw;
    border-radius: 15px;
  }
`;

//corossel for event images
const ControlledCarousel = ({ userevents }) => {
  // console.log("I got called");
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {userevents.length > 0 ? (
        userevents.map((event, key) => {
          // console.log("image is :", event.image);

          return (
            <Carousel.Item key={key}>
              <div className="overlay1">
                <div className="overlay2">
                  <img
                    className="d-block w-100 image-slider"
                    rounded
                    src={event.image}
                    alt="First slide"
                  />
                </div>
              </div>

              <Carousel.Caption>
                <h3>
                  <b>{event.name}</b>
                </h3>
                <p>{event.topic}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })
      ) : (
        <Image
          className="image-slider"
          style={{ borderRadius: "15px" }}
          src={image}
          alt="First slide"
        />
      )}
    </Carousel>
  );
};

const DashBoard = ({ allevents, getevents, userevents, myevents }) => {
  //card component
  const Mycard = ({ subtitle, numbooked, numcheck, date }) => {
    let passedEvents = 0;
    let availableEvents = 0;
    let attendedEvents = 0;
    allevents.forEach((event) => {
      if (
        Date(
          event.date.substring(0, 4),
          event.date.substring(5, 7),
          event.date.substring(8, 10)
        ) > Date()
      ) {
        passedEvents = passedEvents + 1;
      } else {
        availableEvents = availableEvents + 1;
      }
    });
    return (
      <Card
        style={{
          width: "18rem",
          opacity: 0.2,
          backgroundColor: "#000",
          borderRadius: "15px",
        }}
        // text={"dark"}
      >
        <Card.Body>
          <Card.Title>Events</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>
            {numcheck === "1" ? (
              <b>{numbooked}</b>
            ) : numcheck === "2" ? (
              <b>{availableEvents}</b>
            ) : numcheck === "3" ? (
              <b>{passedEvents}</b>
            ) : numcheck === "4" ? (
              <b>0</b>
            ) : (
              ""
            )}
          </Card.Text>
          <Card.Footer style={{ fontSize: "16px" }}>
            {numcheck === "1" ? (
              <small>
                You've joined{" "}
                {((userevents.length / availableEvents) * 100)
                  .toString()
                  .substring(0, 4)}
                % of all available events
              </small>
            ) : numcheck === "2" ? (
              <small>You can visit you home page to join more events</small>
            ) : numcheck === "3" ? (
              <small>
                Events come and go, there's no harm in missing a few
              </small>
            ) : numcheck === "4" ? (
              <small>
                Great keep joining learning and experiencing more by joining
                events
              </small>
            ) : (
              ""
            )}
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Styles>
      <Container fluid>
        <center>
          <div className="grid-container">
            <div className="item2 grid-item">
              <ControlledCarousel
                userevents={userevents}
                style={{ width: "400px !important" }}
              />
            </div>
            <div grid-item className="item3 grid-item">
              <Mycard
                subtitle="Booked"
                numbooked={myevents.count}
                numcheck="1"
              />
            </div>
            <div className="item4 grid-item">
              <Mycard
                subtitle="Available"
                numbooked={myevents.count}
                numcheck="2"
              />
            </div>
            <div className="item5 grid-item">
              <Mycard
                subtitle="Passed"
                numbooked={myevents.count}
                numcheck="3"
              />
            </div>
            <div className="item6 grid-item">
              <Mycard
                subtitle="Attended"
                numbooked={myevents.count}
                numcheck="4"
              />
            </div>
          </div>
        </center>
        <Row>
          <h2>Your Events Details</h2>
        </Row>
        <Row>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Speaker(s)</th>
                <th>Tag</th>
                <th>Date</th>
                <th>Begins At</th>
                <th>Ends At</th>
                <th>Room Capacity</th>
                <th>Seats Remaining</th>
              </tr>
            </thead>
            <tbody>
              {/* collects events data and maps them into new table rows */}
              {userevents.map((event) => {
                let seatsRemaining =
                  event.room_capacity - event.current_seat_number;
                return (
                  <>
                    <tr>
                      <td>{event.name}</td>
                      <td>{event.location}</td>
                      <td>{event.speaker}</td>
                      <td>{event.tagline}</td>
                      <td>{event.date}</td>
                      <td>{event.start_time}</td>
                      <td>{event.end_time}</td>
                      <td>{event.room_capacity}</td>
                      <td>{seatsRemaining}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </Styles>
  );
};

let controller = new AbortController();
class UserDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEvents: [],
      myEvents: { count: 0, data: [] },
      userEvents: [],
    };
  }

  signal = controller.signal;
  //hits the endpoint to get all events and their respective data which is stored in state and passed down
  getData = () => {
    let url = "http://localhost:8000/api/events/";
    fetch(url, {
      signal: this.signal,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ allEvents: data });

        //
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

        let url2 = "http://localhost:8000/api/myevents";
        fetch(url2, {
          signal: this.signal,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ myEvents: { count: data.count, data: data.data } });

            let tempArray = [];
            this.state.myEvents.data.forEach((eventData) => {
              let tempH = this.state.allEvents.find(
                (cevent) => eventData.event === cevent.name
              );
              tempArray.push(tempH);

              // this.setState({ userEvents: [...this.state.userEvents, tempH] });
            });

            this.setState({ userEvents: tempArray });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //calls getEvents to fetch new data whenever page loads
  componentDidMount() {
    this.getData();
  }

  // componentWillUnmount() {
  //   controller.abort();
  // }

  render() {
    return (
      <>
        <DashBoard
          allevents={this.state.allEvents}
          refreshData={this.getEvents}
          myevents={this.state.myEvents}
          userevents={this.state.userEvents}
        />
      </>
    );
  }
}

export default UserDashBoard;

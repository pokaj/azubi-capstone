//Dependencies imports
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

//scopred css for component
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
`;

//component to handle dynamic table row generation
const EventsListingsTable = ({ events }) => {
  return (
    <>
      <Styles>
        <h2>All Events</h2>
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
            {events.map((event) => {
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
      </Styles>
    </>
  );
};

//class to render table of events component
class EventsListingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
    };
  }

  //function to fetch all events on page load
  getEvents = () => {
    let url = "http://localhost:8000/api/events/ ";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ events: data });

        console.log("success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //calls getsEvents on each page update
  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <>
        <EventsListingsTable events={this.state.events} />
      </>
    );
  }
}

export default EventsListingsPage;

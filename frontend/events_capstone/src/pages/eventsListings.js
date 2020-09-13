import React, { Component } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  h2 {
    margin: auto;
    text-align: center;
  }
  .table {
    width: 90%;
    margin: auto;
  }
`;

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

              {/* Display events in a table form showing details such as Title, Location, Speaker, Tag line */}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
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

class EventsListingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
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
        this.setState({ events: data });

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
        <EventsListingsTable events={this.state.events} />
      </>
    );
  }
}

export default EventsListingsPage;

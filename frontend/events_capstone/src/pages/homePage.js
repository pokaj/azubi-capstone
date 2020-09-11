import React, { Component } from "react";

import { Card, Button } from "react-bootstrap";
import { Jumbotron } from "../components/jumbotron";
import { Layout } from "../components/layout";

const Home = ({ cards }) => {
  return (
    <>
      <Jumbotron />
      <Layout>
        {cards.length === 0 ? (
          <div>Sorry there are currently no events available...</div>
        ) : (
          cards.map((event, key) => {
            let imageSrc = "../assets/images/noImage.jpg";
            return (
              <Card style={{ width: "18rem" }} key={key}>
                <Card.Img variant="top" src={imageSrc} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            );
          })
        )}
      </Layout>
    </>
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

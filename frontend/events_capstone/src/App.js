import React from "react";
import "./App.css";
import LandingPage from "./components/landingPage/landingPage.js";
import HomePage from "./pages/homePage";
import EventsListingsPage from "./pages/eventsListings";
import EventRegistrationAndEditForm from "./pages/eventRegistrationAndEditForm";
import NavigationBar from "./components/navigationBar";
import NoMatchPage from "./pages/noMatchPage";
import "bootstrap/dist/css/bootstrap.min.css";

//import dependencies to handle routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/eventsListings" component={EventsListingsPage} />
          <Route
            path="/eventRegistrationAndEditForm"
            component={EventRegistrationAndEditForm}
          />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

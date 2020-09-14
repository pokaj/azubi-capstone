import React from "react";
import "./App.css";

import GlobalStateProvider from "./store/globalStateProvider";
import LandingPage from "./components/landingPage/landingPage.js";
import HomePage from "./pages/homePage";
import EventsListingsPage from "./pages/eventsListings";
import EventRegistrationAndEditForm from "./pages/justInCase";
import NavigationBar from "./components/navigationBar";
import PageNotFound from "./pages/pageNotFound";
import SecuredRoute from "./routes/securedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

//import dependencies to handle routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStateProvider>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <SecuredRoute path="/home" component={HomePage} />
            <SecuredRoute
              path="/eventsListings"
              component={EventsListingsPage}
            />
            <SecuredRoute
              path="/eventRegistrationAndEditForm"
              component={HomePage}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </GlobalStateProvider>
    </>
  );
}

export { App };
// export default App;

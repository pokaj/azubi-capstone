//dependencies imports
import React from "react";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";
import NavigationBar from "../components/navigationBar";

//modules imports
import { useGlobalStateStore } from "../store/globalContext";
import Styled from "styled-components";

//scoped component css
const Styles = Styled.div`
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');


.font-theme {

  font-family: 'Quicksand', sans-serif;
}

`;

//component secures private routes from unauthenticated user access
function SecuredRoute(props) {
  const globalStateStore = useGlobalStateStore();

  //checks and logic preventing state loss of softState
  //data on page reload/refresh
  if (_.isEmpty(globalStateStore.currentUserData)) {
    let tempUserInfo = localStorage.getItem("currentUserData");
    let tempUserData = JSON.parse(tempUserInfo);
    if (!_.isEmpty(tempUserData)) {
      globalStateStore.addCurrentUserData(tempUserData);
      globalStateStore.onLogIn();
    }
  }

  //returns specified route is user is authoried else sends user back to login screen
  return (
    <Styles>
      <NavigationBar className="font-theme" />
      <Route
        path={props.path}
        render={(data) =>
          globalStateStore.isLoggedIn ? (
            <props.component {...data}></props.component>
          ) : (
            <Redirect to={{ pathname: "/" }}></Redirect>
          )
        }
      ></Route>
    </Styles>
  );
}

export default SecuredRoute;

import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";
import { useGlobalStateStore } from "../store/globalContext";

//component secures private routes from unauthenticated users
function SecuredRoute(props) {
  const globalStateStore = useGlobalStateStore();

  return (
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
  );
}

export default SecuredRoute;

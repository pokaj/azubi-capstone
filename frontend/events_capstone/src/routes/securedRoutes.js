import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import Context from "../store/context";

//component secures private routes from unauthenticated users
function SecuredRoute(props) {
  const { globalState, globalDispatch } = useContext(Context);

  return (
    <Route
      path={props.path}
      render={(data) =>
        globalState.isLoggedIn ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}

export default SecuredRoute;

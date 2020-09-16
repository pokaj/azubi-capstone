import { useLocalStore } from "mobx-react";
import React from "react";
import { userDataStore } from "./globalStateProvider";

const GlobalContext = React.createContext(null);

export const GlobalStateProvider = ({ children }) => {
  const globalStateStore = useLocalStore(userDataStore);
  return (
    <GlobalContext.Provider value={globalStateStore}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalStateStore = () => React.useContext(GlobalContext);

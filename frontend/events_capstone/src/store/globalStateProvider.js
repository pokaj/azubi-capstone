//store for current User state
function userDataStore() {
  return {
    isLoggedIn: false,
    currentUserData: {},

    addCurrentUserData(userData) {
      this.currentUserData = { ...userData };
    },
    onLogIn() {
      this.isLoggedIn = true;
      localStorage.setItem(
        "currentUserData",
        JSON.stringify(this.currentUserData)
      );
    },
    onLogOut() {
      this.isLoggedIn = false;
      localStorage.setItem("currentUserData", JSON.stringify({}));
      this.currentUserData = {};
    },
  };
}

//store for allEvents state

function allEventsStore() {
  return {
    allEvents: [],

    addAnEvent(event) {
      this.addEvents.push(event);
    },
    addEvents(events) {
      this.allEvents = [...this.allEvents, ...events];
    },
    clearAllEvents() {
      this.allEvents = [];
    },
  };
}

//store for current User Events state

function myEventsStore() {
  return {
    myEvents: [],
    addBookedEvent(event) {
      this.myEvents.push(event);
    },
    addBookedEvents(events) {
      this.myEvents = [...this.myEvents, ...events];
    },
    clearAllMyEvents() {
      this.myEvents = [];
    },
    removedEvent(eventId) {
      this.myEvents = this.myEvents.filter((event) => event.id !== eventId);
    },
  };
}

//exporting various stores
export { userDataStore, allEventsStore, myEventsStore };

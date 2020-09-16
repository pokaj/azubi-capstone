function userDataStore() {
  return {
    isLoggedIn: false,
    currentUserData: {},

    addCurrentUserData(userData) {
      this.currentUserData = { ...userData };
    },
    onLogIn() {
      this.isLoggedIn = true;
    },
    onLogOut() {
      this.isLoggedIn = false;
      this.currentUserData = {};
    },
  };
}

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

export { userDataStore, allEventsStore, myEventsStore };

// The Redux store: holds the app's shared state ({ events: { items: [...] } }).
import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;

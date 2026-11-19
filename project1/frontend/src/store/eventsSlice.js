// Redux slice (required research): keeps the list of events in one central place.
// Every page reads the same list, and every change (add, edit, delete) updates it here.
import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    items: [],
  },
  reducers: {
    // Replace the whole list (after GET /events)
    setEvents(state, action) {
      state.items = action.payload;
    },
    // Add one event (after POST /events)
    addEvent(state, action) {
      state.items.push(action.payload);
    },
    // Replace one event (after PUT /events/:id)
    updateEvent(state, action) {
      state.items = state.items.map((event) => (event.id === action.payload.id ? action.payload : event));
    },
    // Remove one event by id (after DELETE /events/:id)
    removeEvent(state, action) {
      state.items = state.items.filter((event) => event.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, updateEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

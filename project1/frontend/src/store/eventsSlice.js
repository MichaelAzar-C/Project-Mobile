import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    items: [],
  },
  reducers: {
    setEvents(state, action) {
      state.items = action.payload;
    },
    addEvent(state, action) {
      state.items.push(action.payload);
    },
    updateEvent(state, action) {
      state.items = state.items.map((event) => (event.id === action.payload.id ? action.payload : event));
    },
    removeEvent(state, action) {
      state.items = state.items.filter((event) => event.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, updateEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

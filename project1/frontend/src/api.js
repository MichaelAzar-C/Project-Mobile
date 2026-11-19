// Address of the backend Web API (see backend/server.js)
export const API_URL = "http://localhost:3000/events";

// The event categories used in the form and the filters
export const CATEGORIES = ["Music", "Sports", "Conference", "Workshop", "Art", "Food"];

// Today's date as "YYYY-MM-DD", to compare with event.date
export const TODAY = new Date().toISOString().slice(0, 10);

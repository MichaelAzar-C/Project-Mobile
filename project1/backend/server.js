// Web API for managing events: CRUD operations over an in-memory array (Chapter 1).
const express = require("express");
const cors = require("cors");
const events = require("./data");

const app = express();
const port = 3000;

// Allows the React app (running on another port, 5173) to call this API
app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// The id given to the next new event
let nextId = events.length + 1;

// GET /events -> return all events
app.get("/events", (req, res) => {
  res.json(events);
});

// GET /events/:id -> return the event with this id
app.get("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find((e) => e.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

// POST /events -> add a new event
app.post("/events", (req, res) => {
  const newEvent = req.body;

  if (newEvent && newEvent.title) {
    newEvent.id = nextId;
    nextId++;
    events.push(newEvent);
    res.status(201).json(newEvent);
  } else {
    res.status(400).json({ message: "Invalid event data" });
  }
});

// PUT /events/:id -> update the event with this id
app.put("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const index = events.findIndex((e) => e.id === eventId);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Keep the same id, replace everything else with the new data
  events[index] = { ...req.body, id: eventId };
  res.json(events[index]);
});

// DELETE /events/:id -> delete the event with this id
app.delete("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const index = events.findIndex((e) => e.id === eventId);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const deletedEvent = events.splice(index, 1);
  res.json(deletedEvent[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

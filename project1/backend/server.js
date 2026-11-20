const express = require('express');
const events = require('./data.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//READ ALL
app.get('/events', (req, res) => {
  res.json(events);
});

//READ SELECTED ID
app.get('/events/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).send({ message: 'Event not found' });
  }
  res.json(event);
});

//POST REQ
app.post('/events', (req, res) => {
  const { title, description, category, date, time, location, price, capacity, isOnline, tags, hostName, hostEmail, imageUrl } = req.body;
  const newId = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;
  const newEvent = { id: newId, title, description, category, date, time, location, price, capacity, isOnline, tags, hostName, hostEmail, imageUrl };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

//UPDATE REQ
app.put('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).send({ message: 'Event not found' });
  }
  const { title, description, category, date, time, location, price, capacity, isOnline, tags, hostName, hostEmail, imageUrl } = req.body;
  Object.assign(event, { title, description, category, date, time, location, price, capacity, isOnline, tags, hostName, hostEmail, imageUrl });
  res.json(event);
});

//DELETE REQ
app.delete('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === eventId);
  if (index === -1) {
    return res.status(404).send({ message: 'Event not found' });
  }
  const deleted = events.splice(index, 1);
  res.json({ message: 'Event deleted', event: deleted[0] });
});

app.all('/{*splat}', (req, res) => {
  res.status(404).send({ message: '404 not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
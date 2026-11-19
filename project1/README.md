# Eventful

CSC457 Mobile App Development, Project 1.
By **Michael Azar** and **Jimmy Abou Ali**, Computer Science, 3rd year, USEK.

Eventful is an events platform: users can browse events, see their details, and host, edit or delete their own.
The project has two apps:

- **Backend** (`backend/`): a NodeJS/Express Web API that performs CRUD operations on events kept in an in-memory array.
- **Frontend** (`frontend/`): a React Single Page Application (Vite + React Router + Redux Toolkit) that uses the API.

---

## How to run

You need Node.js 20.19 or newer. Run the backend and the frontend in **two separate terminals**.

**1. Backend** (http://localhost:3000)

```bash
cd backend
npm install
npm start
```

**2. Frontend** (http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in the browser. The data is kept in memory, so restarting the backend resets the
events to the 8 sample events in `backend/data.js`.

---

## The entity: Event

| Property | Type | Example |
|---|---|---|
| `id` | number | `3` (given by the server) |
| `title` | string | `"Beirut Jazz Nights"` |
| `description` | string | `"An evening of live jazz..."` |
| `category` | string | Music, Sports, Conference, Workshop, Art or Food |
| `date` | string | `"2026-11-14"` |
| `time` | string | `"19:30"` |
| `location` | string | `"Beirut Waterfront, Lebanon"` |
| `price` | number | `45` (0 = free) |
| `capacity` | number | `300` |
| `isOnline` | boolean | `false` |
| `tags` | array of strings | `["Jazz", "Live", "Outdoor"]` |
| `hostName` | string | `"Blue Note Collective"` |
| `hostEmail` | string | `"hello@bluenote.example.com"` |
| `imageUrl` | string | `"https://images.unsplash.com/..."` |

---

## Web API (backend/server.js)

| Method | Route | Description |
|---|---|---|
| GET | `/events` | Get all events |
| GET | `/events/:id` | Get one event (404 if not found) |
| POST | `/events` | Add a new event (201) |
| PUT | `/events/:id` | Update an event (404 if not found) |
| DELETE | `/events/:id` | Delete an event (404 if not found) |

No database, no authentication and no business logic, as the brief requires.

---

## Frontend views

| View | Route | API request |
|---|---|---|
| Home | `/` | GET `/events` |
| About us | `/about` | – |
| Contact us (form with validation) | `/contact` | – |
| Display all events | `/events` | GET `/events` |
| Display one event | `/events/:id` | GET `/events/:id` |
| Submit a new event | `/events/new` | POST `/events` |
| Update an event | `/events/:id/edit` | GET + PUT `/events/:id` |
| Delete an event | `/events/:id/delete` | GET + DELETE `/events/:id` |

---

## Folder structure

```
project1/
├── backend/
│   ├── data.js            # the in-memory array of 8 sample events
│   ├── server.js          # Express app with the 5 CRUD routes
│   └── package.json
└── frontend/
    ├── index.html
    └── src/
        ├── main.jsx       # entry point: <Provider> + <BrowserRouter> + <App>
        ├── App.jsx        # loads the events and defines all the routes
        ├── index.css      # the stylesheet of the whole app
        ├── api.js         # API address, categories, today's date
        ├── store/         # Redux: store.js and eventsSlice.js
        ├── components/    # Navbar, Footer, EventCard, EventForm, CalendarBadge, ...
        └── pages/         # one component per view
```

---

## Which chapter each part comes from

**Chapter 1 – NodeJS and Express:** `backend/server.js` follows the "Web API in Express.JS" example:
`express()`, `express.json()`, `express.urlencoded()`, `app.get/post/put/delete`, route parameters
(`req.params.id`), `res.json()`, `res.status(404)` and `app.listen()`.

**Chapter 2 – React project and JSX:** Vite project structure (`index.html` → `main.jsx` → `App.jsx`), JSX
expressions `{ }`, `className`, fragments `<> </>`, one CSS stylesheet imported in `main.jsx`, and lists rendered
with `map()` and a `key` (events, categories, steps, team members, navbar links).

**Chapter 3 – Components and props:** every part of the UI is a function component in its own file. Props are
destructured, e.g. `EventCard({ event })`, `CalendarBadge({ date, className })`,
`TeamMemberCard({ name, role, bio, email })`. `EventForm` is reused by Add and Edit through props
(`event`, `submitLabel`, `saving`, `onSubmit`, `onCancel`). `App` passes `loading`, `error` and `onRetry` to Home
and EventsList. Images are shown with `<img>` in `EventImage`.

**Chapter 4 – State, hooks, conditional rendering and events:**
- `useState`, including object state updated with the spread operator (`{ ...values, [name]: value }`).
- `useEffect` (listed among the React hooks) to load data when a page opens.
- Conditional rendering with `&&` (errors, "Online" chip, "Ended" chip) and the ternary operator
  ("Free" or the price, the active category button).
- Events: `onClick` (category buttons, delete), `onChange` (every input), `onSubmit` with
  `event.preventDefault()` (Contact and event forms), and passing arguments (`onClick={() => setCategory(item)}`).
- **Contact us** (`pages/Contact.jsx`): a controlled form whose `validate()` function checks the name, the email,
  the subject and the message, shows the errors under the fields, and shows a success message when valid.

**Required research (asked for in the project brief):**
- **React Router:** `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`, `<NavLink>`, `useParams()` and
  `useNavigate()`.
- **Redux Toolkit:** `configureStore` and one slice (`createSlice`) holding the list of events, with 4 actions:
  `setEvents`, `addEvent`, `updateEvent` and `removeEvent`. Components read the list with `useSelector` and
  change it with `useDispatch`.

**Needed to connect the two apps:**
- `fetch()` with `async`/`await` sends the HTTP requests to the Web API.
- The `cors` package in the backend lets the React app (port 5173) call the API (port 3000).

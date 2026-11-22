import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setEvents } from "./store/eventsSlice";
import { API_URL } from "./api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EventsList from "./pages/EventsList";
import EventDetails from "./pages/EventDetails";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import DeleteEvent from "./pages/DeleteEvent";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      dispatch(setEvents(data));
    } catch {
      setError("Could not load the events. Make sure the backend is running on port 3000.");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <Routes>
          <Route path="/" element={<Home loading={loading} error={error} onRetry={loadEvents} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<EventsList loading={loading} error={error} onRetry={loadEvents} />} />
          <Route path="/events/new" element={<AddEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/edit" element={<EditEvent />} />
          <Route path="/events/:id/delete" element={<DeleteEvent />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { addEvent } from "../store/eventsSlice";
import { API_URL } from "../api";

// "Submit a new event" view: POST /events
function AddEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(eventData) {
    setSaving(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      const newEvent = await response.json();
      dispatch(addEvent(newEvent)); // add it to the Redux store too
      navigate(`/events/${newEvent.id}`); // open the new event's page
    } catch {
      setError("Could not publish the event. Is the backend running?");
      setSaving(false);
    }
  }

  return (
    <div>
      <header className="page-header">
        <p className="eyebrow">Host an event</p>
        <h1 className="page-title">
          Tell people about <span className="highlight">your event</span>
        </h1>
        <p className="page-subtitle">Fill in the details below. Your event appears on Eventful as soon as you publish it.</p>
      </header>

      {error && <p className="alert alert-error">{error}</p>}

      <EventForm submitLabel="Publish event" saving={saving} onSubmit={handleSubmit} onCancel={() => navigate("/events")} />
    </div>
  );
}

export default AddEvent;

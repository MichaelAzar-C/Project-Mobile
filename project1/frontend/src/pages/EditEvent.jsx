import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateEvent } from "../store/eventsSlice";
import { API_URL } from "../api";

function EditEvent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          setEvent(await response.json());
        } else {
          setError("This event does not exist. It may have been deleted.");
        }
      } catch {
        setError("Could not reach the server. Make sure the backend is running.");
      }
      setLoading(false);
    }
    loadEvent();
  }, [id]);

  async function handleSubmit(eventData) {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      const updated = await response.json();
      dispatch(updateEvent(updated));
      navigate(`/events/${id}`);
    } catch {
      setError("Could not save the changes. Is the backend running?");
      setSaving(false);
    }
  }

  if (loading) return <Loader text="Loading event..." />;
  if (!event) return <Message title="Event not found" text={error} />;

  return (
    <div>
      <header className="page-header">
        <p className="eyebrow">Edit event</p>
        <h1 className="page-title">{event.title}</h1>
        <p className="page-subtitle">Update the details below. Changes are visible to everyone right away.</p>
      </header>

      {error && <p className="alert alert-error">{error}</p>}

      <EventForm event={event} submitLabel="Save changes" saving={saving} onSubmit={handleSubmit} onCancel={() => navigate(`/events/${id}`)} />
    </div>
  );
}

export default EditEvent;

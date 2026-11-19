import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EventImage from "../components/EventImage";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { removeEvent } from "../store/eventsSlice";
import { API_URL } from "../api";

// "Delete an event" view: shows the event and asks for confirmation, then DELETE /events/:id
function DeleteEvent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          setEvent(await response.json());
        } else {
          setError("This event does not exist. It may already have been deleted.");
        }
      } catch {
        setError("Could not reach the server. Make sure the backend is running.");
      }
      setLoading(false);
    }
    loadEvent();
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      dispatch(removeEvent(event.id)); // remove it from the Redux store too
      navigate("/events");
    } catch {
      setError("Could not delete the event. Is the backend running?");
      setDeleting(false);
    }
  }

  if (loading) return <Loader text="Loading event..." />;
  if (!event) return <Message title="Event not found" text={error} />;

  return (
    <div className="delete-page">
      <div className="delete-card">
        <span className="delete-icon">!</span>
        <h1 className="delete-title">Delete this event?</h1>
        <p className="delete-text">This can't be undone. The event disappears from Eventful for everyone.</p>

        <div className="delete-summary">
          <EventImage src={event.imageUrl} alt="" className="delete-thumb" />
          <div>
            <p className="delete-summary-title">{event.title}</p>
            <p className="delete-summary-meta">{event.date} · {event.time}</p>
            <p className="delete-summary-meta">{event.location}</p>
          </div>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <div className="button-row delete-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/events/${id}`)} disabled={deleting}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Yes, delete event"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteEvent;

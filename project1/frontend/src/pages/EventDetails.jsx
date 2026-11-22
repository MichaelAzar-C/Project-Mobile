import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventImage from "../components/EventImage";
import CalendarBadge from "../components/CalendarBadge";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { API_URL, TODAY } from "../api";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <Loader text="Loading event..." />;
  if (error) return <Message title="Event not found" text={error} />;

  const facts = [
    { label: "Date", value: new Date(event.date + "T00:00").toDateString() },
    { label: "Time", value: event.time },
    { label: event.isOnline ? "Where to join" : "Location", value: event.location },
    { label: "Price", value: event.price === 0 ? "Free" : `$${event.price} per seat` },
    { label: "Capacity", value: `${event.capacity} seats` },
    { label: "Category", value: event.category },
  ];

  return (
    <div className="details">
      <Link to="/events" className="back-link">← All events</Link>

      <div className="details-media">
        <EventImage src={event.imageUrl} alt={event.title} />
        <CalendarBadge date={event.date} className="details-calendar" />
      </div>

      <div className="details-main">
        <div className="chips">
          <span className="chip chip-category">{event.category}</span>
          {event.isOnline && <span className="chip chip-online">Online</span>}
          {event.price === 0 && <span className="chip chip-free">Free</span>}
          {event.date < TODAY && <span className="chip chip-past">Ended</span>}
        </div>

        <h1 className="details-title">{event.title}</h1>

        <div className="details-facts">
          {facts.map((fact) => (
            <div key={fact.label} className="details-fact">
              <span className="details-fact-label">{fact.label}</span>
              <span className="details-fact-value">{fact.value}</span>
            </div>
          ))}
        </div>

        <section className="details-section">
          <h3 className="details-heading">About this event</h3>
          <p className="details-description">{event.description}</p>
          <div className="chips">
            {event.tags.map((tag) => (
              <span key={tag} className="chip details-tag">#{tag}</span>
            ))}
          </div>
        </section>

        <section className="details-host">
          <p className="details-host-label">Hosted by</p>
          <p className="details-host-name">{event.hostName}</p>
          <p className="details-host-email">{event.hostEmail}</p>
        </section>

        <section className="details-manage">
          <p className="details-manage-text">Is this your event?</p>
          <div className="button-row">
            <Link to={`/events/${event.id}/edit`} className="btn btn-secondary btn-sm">Edit event</Link>
            <Link to={`/events/${event.id}/delete`} className="btn btn-danger btn-sm">Delete event</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EventDetails;

import { Link } from "react-router-dom";
import EventImage from "./EventImage";
import CalendarBadge from "./CalendarBadge";
import { TODAY } from "../api";

function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <div className="event-card-media">
        <EventImage src={event.imageUrl} alt={event.title} />
        <CalendarBadge date={event.date} className="event-card-calendar" />
        {event.date < TODAY && <span className="chip chip-past event-card-status">Ended</span>}
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <span className="event-card-host">by {event.hostName}</span>

        <div className="event-card-row">
          <span className="event-card-when">
            {event.date} | {event.time}
          </span>
          <span className="event-card-price">{event.price === 0 ? "Free" : `$${event.price}`}</span>
        </div>

        <div className="chips">
          <span className="chip chip-category">{event.category}</span>
          {event.isOnline && <span className="chip chip-online">Online</span>}
        </div>
      </div>
    </Link>
  );
}

export default EventCard;

import { useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { CATEGORIES } from "../api";

// "Display all events" view, with a search box and category buttons.
// loading, error and onRetry come from App as props.
function EventsList({ loading, error, onRetry }) {
  const events = useSelector((state) => state.events.items);

  // State of the search box and of the selected category ("All" = no filter)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Keep only the events that match the search text and the category, sorted by date
  const results = events
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .filter((event) => category === "All" || event.category === category)
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div>
      <header className="page-header">
        <p className="eyebrow">Events</p>
        <h1 className="page-title">
          Find your next <span className="highlight">night out</span>
        </h1>
      </header>

      <section className="filters">
        <input
          type="text"
          className="form-control"
          placeholder="Search events by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-chips">
          {["All", ...CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "toggle-chip is-active" : "toggle-chip"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {loading && <Loader text="Loading events..." />}
      {error && <Message title="Something went wrong" text={error} onRetry={onRetry} />}

      {!loading && !error && (
        <>
          <p className="results-count">{results.length} events</p>
          {results.length > 0 ? (
            <div className="event-grid">
              {results.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Message title="No events found" text="Try another word or another category." />
          )}
        </>
      )}
    </div>
  );
}

export default EventsList;

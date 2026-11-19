import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { TODAY } from "../api";

// The 3 steps of using the app (rendered with map)
const steps = [
  { title: "Find an event", text: "Browse concerts, workshops, sports and more, or search by name or host." },
  { title: "Check the details", text: "See the date, place, price and number of seats of every event." },
  { title: "Host your own", text: "Publish your event in a minute and edit or remove it at any time." },
];

// Home view. loading, error and onRetry come from App as props.
function Home({ loading, error, onRetry }) {
  // Read the events from the Redux store
  const events = useSelector((state) => state.events.items);

  // Upcoming events only, sorted by date (soonest first)
  const upcoming = events
    .filter((event) => event.date >= TODAY)
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div>
      <header className="home-header">
        <h1 className="page-title">
          Book great events or <span className="highlight">host your own</span>
        </h1>
        <div className="home-header-row">
          <span className="home-count">{upcoming.length} upcoming events</span>
          <Link to="/events/new" className="home-host-link">Host an event ↗</Link>
        </div>
      </header>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Upcoming events</h2>
          <Link to="/events" className="section-link">See all →</Link>
        </div>

        {loading && <Loader text="Loading events..." />}
        {error && <Message title="Something went wrong" text={error} onRetry={onRetry} />}

        {!loading && !error && (
          upcoming.length > 0 ? (
            <div className="event-grid">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="home-empty">No upcoming events yet. Be the first to host one!</p>
          )
        )}
      </section>

      <section className="home-section how-it-works">
        <h2 className="section-title">How Eventful works</h2>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-number">{index + 1}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="button-row">
          <Link to="/events" className="btn btn-primary">Browse events</Link>
          <Link to="/events/new" className="btn btn-secondary">Host an event</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

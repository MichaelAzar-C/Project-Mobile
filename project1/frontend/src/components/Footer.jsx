import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">Eventful</p>
          <p className="footer-text">Book great events or host your own, all in one place.</p>
        </div>
        <nav className="footer-links">
          <Link to="/events">Browse events</Link>
          <Link to="/events/new">Host an event</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
        </nav>
      </div>
      <p className="footer-copy">© 2026 Eventful · CSC457 Mobile App Development</p>
    </footer>
  );
}

export default Footer;

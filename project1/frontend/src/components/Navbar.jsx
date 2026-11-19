import { Link, NavLink } from "react-router-dom";

// Links of the navigation bar (rendered with map)
const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact us" },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">E</span>
          <span>Eventful</span>
        </Link>

        <nav className="navbar-menu">
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.to}>
                {/* NavLink gets the "active" class when its page is open */}
                <NavLink to={link.to} end className="navbar-link">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/events/new" className="btn btn-primary">
            + Host an event
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

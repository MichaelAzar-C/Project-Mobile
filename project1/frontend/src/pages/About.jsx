import TeamMemberCard from "../components/TeamMemberCard";

// What makes Eventful different (rendered with .map)
const values = [
  {
    title: "Open to everyone",
    text: "Free and paid events, online and in person. Anyone can find something to do this weekend.",
  },
  {
    title: "Hosting made simple",
    text: "A short form is all it takes to publish an event. Hosts can update or remove it whenever plans change.",
  },
  {
    title: "All the details up front",
    text: "Every event shows its date, place, price and number of seats, so you know exactly what to expect.",
  },
];

const team = [
  {
    name: "Michael Azar",
    role: "Computer Science, 3rd year",
    bio: "Built Eventful's React pages, Redux store and Express Web API for CSC457.",
    email: "michael.c.azar@net.usek.edu.lb",
  },
  {
    name: "Jimmy Abou Ali",
    role: "Computer Science, 3rd year",
    bio: "Built Eventful's React pages, Redux store and Express Web API for CSC457.",
    email: "jimmy.g.abouali@net.usek.edu.lb",
  },
];

function About() {
  return (
    <div className="about">
      <header className="page-header">
        <p className="eyebrow">About us</p>
        <h1 className="page-title">
          We bring people together around <span className="highlight">great events</span>
        </h1>
        <p className="page-subtitle">
          Eventful is a student project for CSC457 Mobile App Development: a place to discover events, see all their details in
          seconds, and host your own.
        </p>
      </header>

      <section className="about-mission">
        <div className="about-mission-text">
          <h2 className="about-heading">Our mission</h2>
          <p>
            Finding out what's happening in your city shouldn't mean scrolling through ten different pages. We collect
            concerts, workshops, sports, food festivals and exhibitions in one simple app that works just as well on
            your phone as on your laptop.
          </p>
          <p>
            Organizers matter just as much as attendees. That's why anyone can host an event on Eventful, from a
            small online workshop to a city marathon.
          </p>
        </div>
        <ul className="about-facts">
          <li><strong>6</strong> event categories</li>
          <li><strong>Free</strong> and paid events</li>
          <li><strong>Online</strong> and in-person</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="about-heading">What we care about</h2>
        <div className="values">
          {values.map((value) => (
            <article key={value.title} className="value-card">
              <h3 className="value-title">{value.title}</h3>
              <p className="value-text">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-heading">Meet the team</h2>
        <div className="team-grid">
          {/* Each member is passed to TeamMemberCard as props */}
          {team.map((member) => (
            <TeamMemberCard
              key={member.email}
              name={member.name}
              role={member.role}
              bio={member.bio}
              email={member.email}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default About;

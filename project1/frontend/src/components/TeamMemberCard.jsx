function TeamMemberCard({ name, role, bio, email }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="team-card">
      <span className="avatar avatar-lg">{initials}</span>
      <h3 className="team-card-name">{name}</h3>
      <p className="team-card-role">{role}</p>
      <p className="team-card-bio">{bio}</p>
      <p className="team-card-email">{email}</p>
    </article>
  );
}

export default TeamMemberCard;

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function CalendarBadge({ date, className }) {
  const parts = date.split("-");
  const month = MONTHS[Number(parts[1]) - 1];
  const day = Number(parts[2]);

  return (
    <div className={`calendar-badge ${className}`}>
      <span className="calendar-badge-month">{month}</span>
      <span className="calendar-badge-day">{day}</span>
    </div>
  );
}

export default CalendarBadge;

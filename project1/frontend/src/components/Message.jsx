// A box with a title and a text, used for errors, "not found" and "nothing here" messages.
// If an onRetry function is passed, a "Try again" button is shown.
function Message({ title, text, onRetry }) {
  return (
    <div className="empty-state">
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-text">{text}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default Message;

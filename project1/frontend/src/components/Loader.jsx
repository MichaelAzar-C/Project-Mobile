// Spinning circle with a short text, shown while data is loading
function Loader({ text }) {
  return (
    <div className="loader">
      <span className="loader-spinner" />
      <span>{text}</span>
    </div>
  );
}

export default Loader;

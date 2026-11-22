function Loader({ text }) {
  return (
    <div className="loader">
      <span className="loader-spinner" />
      <span>{text}</span>
    </div>
  );
}

export default Loader;

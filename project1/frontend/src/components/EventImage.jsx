import { useState } from "react";

// Shows the event photo, or a colored box if the image link is empty or broken
function EventImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className={`event-image event-image-fallback ${className}`} />;
  }

  return <img src={src} alt={alt} className={`event-image ${className}`} onError={() => setFailed(true)} />;
}

export default EventImage;

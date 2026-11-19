import { useState } from "react";
import { CATEGORIES } from "../api";

// Starting values of an empty form (inputs always hold text)
const emptyForm = {
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  location: "",
  price: "",
  capacity: "",
  isOnline: false,
  tags: "",
  hostName: "",
  hostEmail: "",
  imageUrl: "",
};

// Checks the values and returns an object of error messages ({} = no errors)
function validate(values) {
  const errors = {};
  if (values.title.trim().length < 3) errors.title = "The title must be at least 3 characters.";
  if (values.description.trim().length < 20) errors.description = "Write at least 20 characters.";
  if (values.category === "") errors.category = "Please choose a category.";
  if (values.date === "") errors.date = "Please choose a date.";
  if (values.time === "") errors.time = "Please choose a start time.";
  if (values.location.trim() === "") errors.location = "Please enter the location.";
  if (values.price === "" || Number(values.price) < 0) errors.price = "Enter a price of 0 or more (0 = free).";
  if (values.capacity === "" || Number(values.capacity) < 1) errors.capacity = "Enter at least 1 seat.";
  if (values.tags.trim() === "") errors.tags = "Add at least one tag.";
  if (values.hostName.trim() === "") errors.hostName = "Please enter the host's name.";
  if (!values.hostEmail.includes("@") || !values.hostEmail.includes(".")) {
    errors.hostEmail = "Enter a valid email, like name@example.com.";
  }
  if (!values.imageUrl.startsWith("http")) errors.imageUrl = "Enter a link starting with http:// or https://.";
  return errors;
}

// Form used by both "Host an event" (AddEvent) and "Edit event" (EditEvent).
// Props:
//   event       - the event to edit (not passed when adding a new event)
//   submitLabel - text of the main button
//   saving      - true while the request is running (disables the buttons)
//   onSubmit    - called with the event data when the form is valid
//   onCancel    - called by the Cancel button
function EventForm({ event, submitLabel, saving, onSubmit, onCancel }) {
  // When editing, start with the event's values (numbers and the tags list become text)
  const startValues = event
    ? { ...event, price: String(event.price), capacity: String(event.capacity), tags: event.tags.join(", ") }
    : emptyForm;

  const [values, setValues] = useState(startValues);
  const [errors, setErrors] = useState({});

  // One change handler for every input, using the input's "name"
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading
    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Turn the text values into the right data types before sending them to the API
      onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        date: values.date,
        time: values.time,
        location: values.location.trim(),
        price: Number(values.price),
        capacity: Number(values.capacity),
        isOnline: values.isOnline,
        tags: values.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
        hostName: values.hostName.trim(),
        hostEmail: values.hostEmail.trim(),
        imageUrl: values.imageUrl.trim(),
      });
    }
  }

  // Red border on inputs that have an error
  function inputClass(field) {
    return errors[field] ? "form-control has-error" : "form-control";
  }

  return (
    <form className="event-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="event-form-section">
        <legend className="event-form-legend">Basics</legend>

        <div className="form-field">
          <label htmlFor="title" className="form-label">Event title</label>
          <input id="title" name="title" type="text" placeholder="e.g. Beirut Jazz Nights"
            value={values.title} onChange={handleChange} className={inputClass("title")} />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="category" className="form-label">Category</label>
          <select id="category" name="category" value={values.category} onChange={handleChange} className={inputClass("category")}>
            <option value="">Choose a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" name="description" rows="5" placeholder="What will happen, who is it for?"
            value={values.description} onChange={handleChange} className={inputClass("description")} />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>
      </fieldset>

      <fieldset className="event-form-section">
        <legend className="event-form-legend">Date &amp; place</legend>

        <div className="event-form-row">
          <div className="form-field">
            <label htmlFor="date" className="form-label">Date</label>
            <input id="date" name="date" type="date" value={values.date} onChange={handleChange} className={inputClass("date")} />
            {errors.date && <p className="form-error">{errors.date}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="time" className="form-label">Start time</label>
            <input id="time" name="time" type="time" value={values.time} onChange={handleChange} className={inputClass("time")} />
            {errors.time && <p className="form-error">{errors.time}</p>}
          </div>
        </div>

        <label className="checkbox-row">
          <input name="isOnline" type="checkbox" checked={values.isOnline} onChange={handleChange} />
          This is an online event
        </label>

        <div className="form-field">
          <label htmlFor="location" className="form-label">{values.isOnline ? "Where to join" : "Location"}</label>
          <input id="location" name="location" type="text" placeholder="e.g. Beirut Waterfront, Lebanon"
            value={values.location} onChange={handleChange} className={inputClass("location")} />
          {errors.location && <p className="form-error">{errors.location}</p>}
        </div>
      </fieldset>

      <fieldset className="event-form-section">
        <legend className="event-form-legend">Tickets</legend>
        <div className="event-form-row">
          <div className="form-field">
            <label htmlFor="price" className="form-label">Ticket price ($)</label>
            <input id="price" name="price" type="number" min="0" placeholder="0"
              value={values.price} onChange={handleChange} className={inputClass("price")} />
            {errors.price ? <p className="form-error">{errors.price}</p> : <p className="form-hint">Use 0 for a free event.</p>}
          </div>
          <div className="form-field">
            <label htmlFor="capacity" className="form-label">Number of seats</label>
            <input id="capacity" name="capacity" type="number" min="1" placeholder="100"
              value={values.capacity} onChange={handleChange} className={inputClass("capacity")} />
            {errors.capacity && <p className="form-error">{errors.capacity}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset className="event-form-section">
        <legend className="event-form-legend">Tags, host and image</legend>

        <div className="form-field">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input id="tags" name="tags" type="text" placeholder="e.g. Jazz, Outdoor, Family"
            value={values.tags} onChange={handleChange} className={inputClass("tags")} />
          {errors.tags ? <p className="form-error">{errors.tags}</p> : <p className="form-hint">Separate tags with commas.</p>}
        </div>

        <div className="event-form-row">
          <div className="form-field">
            <label htmlFor="hostName" className="form-label">Host or organizer</label>
            <input id="hostName" name="hostName" type="text" placeholder="e.g. Blue Note Collective"
              value={values.hostName} onChange={handleChange} className={inputClass("hostName")} />
            {errors.hostName && <p className="form-error">{errors.hostName}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="hostEmail" className="form-label">Contact email</label>
            <input id="hostEmail" name="hostEmail" type="email" placeholder="hello@example.com"
              value={values.hostEmail} onChange={handleChange} className={inputClass("hostEmail")} />
            {errors.hostEmail && <p className="form-error">{errors.hostEmail}</p>}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="imageUrl" className="form-label">Image link</label>
          <input id="imageUrl" name="imageUrl" type="url" placeholder="https://images.unsplash.com/..."
            value={values.imageUrl} onChange={handleChange} className={inputClass("imageUrl")} />
          {errors.imageUrl && <p className="form-error">{errors.imageUrl}</p>}
        </div>
      </fieldset>

      <div className="event-form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default EventForm;

import { useState } from "react";

const SUBJECTS = ["General question", "Hosting an event", "Feedback or suggestion"];

const emptyForm = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Your name must be at least 2 characters.";
  }
  if (!values.email.includes("@") || !values.email.includes(".")) {
    errors.email = "Enter a valid email address, like name@example.com.";
  }
  if (values.subject === "") {
    errors.subject = "Please choose a subject.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Your message must be at least 10 characters.";
  }
  return errors;
}

function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setSent(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSent(true);
      setValues(emptyForm);
    }
  }

  function inputClass(field) {
    return errors[field] ? "form-control has-error" : "form-control";
  }

  return (
    <div className="contact">
      <header className="page-header">
        <p className="eyebrow">Contact us</p>
        <h1 className="page-title">
          We'd love to <span className="highlight">hear from you</span>
        </h1>
        <p className="page-subtitle">
          Questions about an event, ideas for new features, or help hosting your first event. Send us a message and
          we'll reply within one working day.
        </p>
      </header>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {sent && <p className="alert alert-success">Thanks! Your message was sent. We'll get back to you soon.</p>}

          <div className="contact-row">
            <div className="form-field">
              <label htmlFor="name" className="form-label">Full name</label>
              <input id="name" name="name" type="text" placeholder="Michael Azar"
                value={values.name} onChange={handleChange} className={inputClass("name")} />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <input id="email" name="email" type="email" placeholder="michael@example.com"
                value={values.email} onChange={handleChange} className={inputClass("email")} />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="subject" className="form-label">Subject</label>
            <select id="subject" name="subject" value={values.subject} onChange={handleChange} className={inputClass("subject")}>
              <option value="">Choose a subject</option>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            {errors.subject && <p className="form-error">{errors.subject}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea id="message" name="message" rows="6" placeholder="How can we help?"
              value={values.message} onChange={handleChange} className={inputClass("message")} />
            {errors.message && <p className="form-error">{errors.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary contact-submit">Send message</button>
        </form>

        <aside className="contact-info">
          <div className="contact-info-item">
            <h2 className="contact-info-label">Email</h2>
            <p className="contact-info-value">usek@gmail.com</p>
          </div>
          <div className="contact-info-item">
            <h2 className="contact-info-label">Phone</h2>
            <p className="contact-info-value">+961 00 000 000</p>
          </div>
          <div className="contact-info-item">
            <h2 className="contact-info-label">Office</h2>
            <p className="contact-info-value">Kaslik, Keserwan, Lebanon</p>
          </div>
          <div className="contact-info-item">
            <h2 className="contact-info-label">Opening hours</h2>
            <p className="contact-info-value">Monday to Friday, 9:00 AM -6:00 PM</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Contact;

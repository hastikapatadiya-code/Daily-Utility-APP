import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (h) => {
    setUser({
      ...user,
      [h.target.name]: h.target.value,
    });
  };

  const handleSubmit = (h) => {
    h.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("contactData")) || [];
    const updateData = [...oldData, user];
    localStorage.setItem("contactData", JSON.stringify(updateData));
    setUser({ name: "", email: "", message: "" });
    alert("message submitted successfully");
  };

  return (
    <>
      <Navbar />
      <section id="contact">
        <div className="container my-5">
          {/* Heading */}
          <div className="text-center mb-4">
            <h1 className="fw-bold">Contact Us</h1>
            <p className="text-muted">
              We’d love to hear from you. Please fill out the form below.
            </p>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6">
              <form className="card p-5 shadow-sm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={user.email}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={user.message}
                    rows="4"
                    onChange={handleChange}
                    placeholder="Write your message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.8689872230307!2d72.8852912!3d21.237043200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f44e11a9335%3A0x518632bf3395016d!2sdhara%20arcade%2C%20455%2C%20Mahadev%20chowk%2C%20Maruti%20Nandan%20Society%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!5e0!3m2!1sen!2sin!4v1768624981771!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;

import React from "react";
import aboutimg from "../images/image.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <>
      <Navbar />
      <section>
        <div className="my-5  text-center">
          <h1 className="fw-bold text-black">About Us</h1>
          <p className="lead text-black">
            Your Daily Needs, Our Responsibility
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-4" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <h3 className="fw-bold mb-3">Who We Are</h3>
              <p className="text-muted">
                Daily Utility App is a trusted platform that helps you order
                groceries, fruits, vegetables, and household essentials with
                ease. We aim to make daily shopping simple, fast, and
                affordable.
              </p>
              <p className="text-muted">
                Our mission is to deliver fresh and quality products right to
                your doorstep while saving your time and effort.
              </p>
            </div>

            <div className="col-md-6 mb-4 d-flex justify-content-lg-end justify-content-center">
              <img
                src={aboutimg}
                alt="About Daily Utility"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-light py-5">
        <div className="container">
          <h3 className="text-center fw-bold mb-4">Our Values</h3>

          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="p-4 bg-white shadow-sm h-100 rounded">
                <h5>🌱 Freshness</h5>
                <p className="small text-muted">
                  We ensure every product meets quality and freshness standards.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-4 bg-white shadow-sm h-100 rounded">
                <h5>🚚 Fast Delivery</h5>
                <p className="small text-muted">
                  On-time delivery so you never run out of essentials.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-4 bg-white shadow-sm h-100 rounded">
                <h5>🤝 Trust</h5>
                <p className="small text-muted">
                  Transparency and customer satisfaction come first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-dark text-light py-5">
        <div className="container text-center">
          <h3 className="fw-bold mb-3">Why Choose Daily Utility?</h3>
          <p className="mb-4">
            Because we care about your daily needs and deliver quality every
            day.
          </p>
          <button className="btn btn-success btn-lg">EXPLORE NOW</button>
        </div>
      </section>
    </>
  );
}

export default About;

import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-dark text-light mt-5 pt-4 ">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold" style={{ color: "#fff" }}>
                Daily Utility
              </h5>
              <p className="small">
                Your one-stop solution for daily essentials like groceries,
                vegetables, fruits, and household items delivered at your
                doorstep.
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <h6 className="fw-bold">Quick Links</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-light text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-light text-decoration-none"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-light text-decoration-none">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-light text-decoration-none"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-4 mb-3">
              <h6 className="fw-bold">Contact Us</h6>
              <p className="small mb-1">📍 India</p>
              <p className="small mb-1">📞 +91 98765 43210</p>
              <p className="small">✉️ support@dailyutility.com</p>
            </div>
          </div>

          <hr className="border-secondary" />

          {/* Bottom */}
          <div className="text-center pb-3 small">
            © {new Date().getFullYear()} Daily Utility App. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

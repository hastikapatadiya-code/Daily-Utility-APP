import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // 🔥 Sync login state from localStorage
  const syncUser = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  };

  useEffect(() => {
    syncUser();
    window.addEventListener("focus", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("focus", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // 🔥 Close mobile menu if open
  const closeOffcanvas = () => {
    const offcanvas = document.getElementById("mobileMenu");
    if (offcanvas) {
      const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  // 🔥 Navigate helper
  const handleNavClick = (path) => {
    closeOffcanvas();
    navigate(path);
  };

  // 🔥 Logout handler
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    handleNavClick("/login");
  };

  // 🔥 Auto redirect after login
  useEffect(() => {
    if (currentUser) {
      navigate("/home"); // automatically go to Home if logged in
    }
  }, [currentUser, navigate]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            DUA
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* DESKTOP MENU */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactlist">Contact List</Link>
              </li>
            </ul>

            {currentUser ? (
              <>
                <span className="me-3 fw-bold">👤 {currentUser.username}</span>
                <button className="btn btn-outline-danger" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-outline-primary" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE OFFCANVAS */}
      <div className="offcanvas offcanvas-end" id="mobileMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">DUA Menu</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-start"
                onClick={() => handleNavClick("/home")}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-start"
                onClick={() => handleNavClick("/about")}
              >
                About Us
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-start"
                onClick={() => handleNavClick("/contact")}
              >
                Contact Us
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-start"
                onClick={() => handleNavClick("/contactlist")}
              >
                Contact List
              </button>
            </li>
          </ul>

          <hr />

          {currentUser ? (
            <>
              <p className="fw-bold mb-2">👤 {currentUser.username}</p>
              <button className="btn btn-danger w-100" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary w-100"
              onClick={() => handleNavClick("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

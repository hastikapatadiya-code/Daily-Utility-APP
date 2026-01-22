import { Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="banner-img position-relative" id="home">
        <div className="overlay"></div>
        <div className="position-absolute text-light top-50 start-50 translate-middle text-center">
          <h1>DAILY UTILITY APP</h1>
          <button
            className="rounded-pill px-4 py-2"
            style={{ border: "1px solid transparent" }}
          >
            LEARN MORE
          </button>
        </div>
      </div>
      <About />

      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Daily Utility App</h1>
          <p className="text-muted">
            Manage your daily tasks, expenses, and more in one place
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Todo</h5>
                <p className="card-text">Manage your daily tasks</p>
                <Link className="btn btn-primary" to="/dailytodo">
                  Open
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Expense</h5>
                <p className="card-text">Track your expenses</p>
                <Link className="btn btn-primary " to="/dailyexpense">Open</Link>
                
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Weather</h5>
                <p className="card-text">Check today’s weather</p>
                   <Link className="btn btn-primary " to="/weather">Open</Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">News</h5>
                <p className="card-text">Read latest news</p>
                <Link className="btn btn-primary" to="/news"> Open</Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  );
}

export default Home;

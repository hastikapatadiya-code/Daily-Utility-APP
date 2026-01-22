import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function ContactList() {
  const [contact, setContact] = useState([]);
  const [user, setUser] = useState([]);

  // Load Contact Data
  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("contactData")) || [];
    setContact(storedData);
  }, []);

  // Load Login Data
  useEffect(() => {
    const storedLogin =
      JSON.parse(localStorage.getItem("logindata")) || [];
    setUser(storedLogin);
  }, []);

  return (
    <>
      <Navbar />

      {/* CONTACT DETAILS */}
      <div className="container my-5 pt-5">
        <h2 className="text-center mb-4">📞 Contact Details</h2>

        {contact.length === 0 ? (
          <p className="text-center text-danger">Data Not Found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className="text-start">{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* LOGIN DETAILS */}
      <div className="container my-5">
        <h2 className="text-center mb-4">🔐 Login Details</h2>

        {user.length === 0 ? (
          <p className="text-center text-danger">Data Not Found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default ContactList;

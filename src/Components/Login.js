import React, { useState } from "react";
import Navbar from "./Navbar";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("logindata")) || [];
    const updatedData = [...oldData, user];

    // save all users
    localStorage.setItem("logindata", JSON.stringify(updatedData));

    // ✅ IMPORTANT: save current logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    setUser({ username: "", password: "" });
    alert("Login successfully");
  };

  return (
    <>
    <Navbar />
      <div className="d-flex justify-content-center mt-5 pt-5">
        <form
          className="text-center"
          onSubmit={handleSubmit}
          style={{
            border: "2px solid black",
            padding: "20px",
            borderRadius: "10px",
            width: "350px",
          }}
        >
          <h1>LOGIN</h1>
          <br />

          <label className="pe-4">Username:</label>
          <input
            className="pe-5"
            type="text"
            name="username"
            value={user.username}
            placeholder="ENTER YOUR NAME"
            onChange={handleChange}
            required
          />
          <br /><br />

          <label className="pe-4">Password:</label>
          <input
            className="pe-5"
            type="password"
            name="password"
            value={user.password}
            placeholder="ENTER YOUR PASSWORD"
            onChange={handleChange}
            required
          />
          <br /><br />

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </>
  );
}

export default Login;
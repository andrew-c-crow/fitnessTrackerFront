import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api-adapter";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const registeredUser = await registerUser(formData);
    event.preventDefault();
    if (registeredUser.error) {
      setError(registeredUser.error);
    }
    const token = registeredUser.token;
    const message = registeredUser.message;
    localStorage.removeItem("username");
    localStorage.setItem("username", username);
    localStorage.removeItem("token");
    localStorage.setItem("token", token);

    if (token) {navigate("/login")}
  }

  // If time: display ERROR or CONFIRMATION on client side.

  return (
    <>
      {error ? (
        <div class="error">
          {error}
          <button
            onClick={() => {
              setError("");
            }}
          >
            Try again
          </button>
        </div>
      ) : (
        <div>
          <div className="header">I am Register</div>
          <form className="form" onSubmit={handleSubmit}>
            <label className="formLabel">Username:</label>
            <input
              type="text"
              className="userpass"
              id="username"
              required
              onChange={handleChange}
            ></input>
            <label className="formLabel">Password:</label>
            <input
              type="password"
              id="password"
              className="userpass"
              required
              onChange={handleChange}
            ></input>
            <button className="loginbutton" type="submit">Register</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api-adapter";

const Login = () => {

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
        const loggedUser = await loginUser(formData);
        event.preventDefault();
        if (loggedUser.error) {
          setError(loggedUser.error);
        }
        const token = loggedUser.token;
        const message = loggedUser.message;
        localStorage.removeItem("username");
        localStorage.setItem("username", username);
        localStorage.removeItem("token");
        localStorage.setItem("token", token);

        // navigate to user profile when functioning
        if (token) {
            navigate("/myroutines");
        }
    }
        return (
            <>
              {error ? (
                <div className="error">
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
                  <div>I am Login</div>
                  <form className="form" onSubmit={handleSubmit}>
                    <label className="formLabel">Username</label>
                    <input
                      type="text"
                      id="username"
                      required
                      onChange={handleChange}
                    ></input>
                    <label className="formLabel">Password:</label>
                    <input
                      type="password"
                      id="password"
                      required
                      onChange={handleChange}
                    ></input>
                    <button type="submit">Log In</button>
                  </form>
                </div>
              )}
            </>
          );
        };



export default Login
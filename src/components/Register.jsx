import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api-adapter";

const Register = () => {
    const navigate = useNavigate();
  // const [register, setRegister] = useState({
  //   username: '',
  //   password: ''
  // });
  async function handleSubmit(event) {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    const registeredUser = await registerUser(username, password);
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
    <div>
    <div>I am Register</div>
    <form className="form" onSubmit={handleSubmit}>
      <label className="formLabel">Username</label>
      <input type="text" id='username' required></input>
      <label className="formLabel">Password</label>
      <input type='password' id='password' required></input>
      <button type='submit'>Register</button>
    </form>
    </div>
  )

}

export default Register
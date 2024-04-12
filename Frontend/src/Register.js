import { useState } from "react";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUser = () => {
    fetch("http://localhost:8081/saveuser", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.affectedRows > 0) {
          alert("User Saved Successfully");
          setUsername("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registration Form</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button className="submit-button" onClick={saveUser}>
            Submit
          </button>
        </div>
        

      </div>
    </div>
  );
}

export default Register;
